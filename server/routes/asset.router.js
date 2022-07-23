const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();
const upload = require("../modules/multer");
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");

//---------------------REQUESTS---------------------//
//--------GET--------//
// get all posts
router.get("/", (req, res) => {
  getAllPostsQueryString = `SELECT 
                            "user".username,  "user".image as profile_image, "user".about as profile_about,
                            "post".id, "post".user_id, "post".lat, "post".lng, "post".title, "post".description, "post".audio, "post".image
                            FROM "post"
                            JOIN "user" ON "user".id = "post".user_id
                            ORDER BY "post".id DESC;`;

  pool
    .query(getAllPostsQueryString)
    .then((result) => {
      res.send(result.rows);
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(500);
    });
});
// get all the posts of a specific user
router.get("/user/:id", (req, res) => {
  console.log("GET", req.params.id);
  const getUserPostsValues = [req.params.id];
  const getUserPostsQueryString = `SELECT 
                            "user".username,  "user".image as profile_image, "user".about as profile_about,
                            "post".id, "post".user_id, "post".lat, "post".lng, "post".title, "post".description, "post".audio, "post".image
                            FROM "post"
                            JOIN "user" ON "user".id = "post".user_id
                            WHERE "user".id = $1
                            ORDER BY "post".id DESC;`;
  pool
    .query(getUserPostsQueryString, getUserPostsValues)
    .then((result) => {
      res.send(result.rows);
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(500);
    });
});
// get all the posts of users that the logged in user is following
router.get("/followed", (req, res) => {
  const getFollowedPostsQueryValues = [req.user.id];
  const getFollowedPostsQueryString = `SELECT  
                                      "follower".followed_user_id,
                                      "user".username,  "user".image as profile_image, "user".about as profile_about,
                                      "post".id, "post".user_id, "post".lat, "post".lng, "post".title, "post".description, "post".audio, "post".image  
                                      FROM "follower"
                                      JOIN "post" ON "post".user_id = "follower".followed_user_id
                                      JOIN "user" ON "user".id = "post".user_id
                                      WHERE "follower".following_user_id = $1;`;

  pool
    .query(getFollowedPostsQueryString, getFollowedPostsQueryValues)
    .then((result) => {
      res.send(result.rows);
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(500);
    });
});

//--------POST--------//
// post / post post (lol)
router.post(
  "/",
  upload.fields([
    { name: "picture", maxCount: 1 },
    { name: "audio", maxCount: 1 },
  ]),
  (req, res) => {
    // structure req data as array for query
    const newPostValues = [
      req.body.user_id,
      req.body.lat,
      req.body.lng,
      req.body.title,
      req.body.description,
      // slice to remove "public/" from path
      req.files.audio[0].path.slice(7),
      req.files.picture[0].path.slice(7),
    ];
    console.log(newPostValues);

    const newPostQueryString = `INSERT INTO "post" ("user_id", "lat", "lng", "title", "description", "audio", "image")
                                VALUES ($1, $2, $3, $4, $5, $6, $7)
                                RETURNING "id";`;

    pool
      .query(newPostQueryString, newPostValues)
      .then((result) => {
        const newPostId = result.rows[0].id;
        console.log(newPostId);
        // TODO FOR STRETCH - NESTED POOL QUERY TO ADD TAGS IN TAGS TABLE
        res.sendStatus(200);
      })
      .catch((err) => {
        console.log(err);
        res.sendStatus(500);
      });
  }
);

//--------PUT--------//
// put / update post
router.put(
  "/",
  rejectUnauthenticated,
  upload.fields([
    { name: "picture", maxCount: 1 },
    { name: "audio", maxCount: 1 },
  ]),
  (req, res) => {
    console.log(req.body);

    updateQuery = generateUpdateQuery(req.body, req.files);
    console.log(updateQuery);
    if (req.user.id === Number(req.body.user_id)) {
      pool
        .query(updateQuery.queryString, updateQuery.queryValues)
        .then((result) => {
          res.sendStatus(200);
        })
        .catch((err) => {
          console.log(err);
          res.sendStatus(500);
        });
    } else {
      res.sendStatus(403);
    }
  }
);
// put / update profile
router.put(
  "/profile",
  rejectUnauthenticated,
  upload.single("picture"),
  (req, res) => {
    let queryString = "";
    let queryValues = [];
    // set query based on if a picture was uploaded
    if (req.body.picture != "") {
      queryString = `UPDATE "user" SET image = $1, about = $2 WHERE id = $3;`;
      queryValues = [req.file.path.slice(7), req.body.about, req.body.id];
    } else {
      queryString = `UPDATE "user" SET about = $1 WHERE id = $2;`;
      queryValues = [req.body.about, req.body.id];
    }

    pool
      .query(queryString, queryValues)
      .then((result) => {
        res.sendStatus(200);
      })
      .catch((err) => {
        console.log(err);
        res.sendStatus(500);
      });
  }
);
// put / update followed user
router.put("/followed", (req, res) => {
  console.log(req.body);
  // [the currently logged in user, the user whose followed status is being updated]
  const followUserValues = [req.user.id, req.body.idToFollow];
  let followUserQueryString = ``;
  // if the user is following this user
  if (req.body.following) {
    // add row into follower table
    followUserQueryString = `INSERT INTO "follower" ("following_user_id", "followed_user_id")
                            VALUES ($1,$2);`;
  } else {
    // remove row from follower table
    followUserQueryString = `DELETE FROM "follower" WHERE following_user_id = $1 AND followed_user_id = $2;`;
  }
  pool
    .query(followUserQueryString, followUserValues)
    .then((result) => {
      res.sendStatus(200);
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(500);
    });
});

//--------DELETE--------//
// delete post
router.delete("/:id/:userid", rejectUnauthenticated, (req, res) => {
  console.log("DELETE", req.params.id, req.params.userid);
  console.log(req.user.id);

  const deletePostId = [req.params.id];
  const deletePostQuery = `DELETE FROM "post" WHERE id = $1;`;

  if (req.user.id === Number(req.params.userid)) {
    pool
      .query(deletePostQuery, deletePostId)
      .then((result) => {
        res.sendStatus(200);
      })
      .catch((err) => {
        console.log(err);
        res.sendStatus(500);
      });
  } else {
    res.sendStatus(403);
  }
});

//---------------------HELPER FUNCTIONS---------------------//

function generateUpdateQuery(requestObject, requestFiles) {
  let queryValues = [
    requestObject.title,
    requestObject.description,
    requestObject.lat,
    requestObject.lng,
  ];
  let indexCount = 0;
  let queryString = `UPDATE "post" SET title = $1, description = $2, lat = $3, lng = $4`;
  if (requestObject.picture != "") {
    queryValues.push(requestFiles.picture[0].path.slice(7));
    queryString += `, image = $5`;
    indexCount++;
  }
  if (requestObject.audio != "") {
    queryValues.push(requestFiles.audio[0].path.slice(7));
    queryString += `, audio = $${5 + indexCount}`;
    indexCount++;
  }

  queryValues.push(requestObject.id);
  queryString += ` WHERE id = $${5 + indexCount};`;

  return { queryString: queryString, queryValues: queryValues };
}

module.exports = router;
