const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();
const upload = require("../modules/multer");

/**
 * GET route template
 */
router.get("/", (req, res) => {
  // GET route code here
  res.send("ribbit");
});

// post
router.post(
  "/",
  upload.fields([
    { name: "picture", maxCount: 1 },
    { name: "audio", maxCount: 1 },
  ]),
  (req, res) => {
    // POST route code here
    console.log(req.body);
    res.send("honk");
  }
);

module.exports = router;
