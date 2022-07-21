const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();
const upload = require("../modules/multer");
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");

//---------------------REQUESTS---------------------//
// get
router.get("/", (req, res) => {
  // GET route code here
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

// post
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

// put
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
    pool
      .query(updateQuery.queryString, updateQuery.queryValues)
      .then((result) => {
        res.sendStatus(200);
      })
      .catch((err) => {
        console.log(err);
        res.sendStatus(500);
      });
  }
);

// delete
router.delete("/:id", rejectUnauthenticated, (req, res) => {
  console.log("DELETE", req.params.id);

  const deletePostId = [req.params.id];
  const deletePostQuery = `DELETE FROM "post" WHERE id = $1;`;

  pool
    .query(deletePostQuery, deletePostId)
    .then((result) => {
      res.sendStatus(200);
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(500);
    });
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
