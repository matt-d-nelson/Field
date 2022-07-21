//---------------------IMPORTS---------------------//
const multer = require("multer");

//---------------------HELPER FUNCTIONS---------------------//
function removeWhitespace(filename) {
  const returnFilename = filename.split(" ");
  return returnFilename.join("");
}

// configure where to send assets to
const assetStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/assets");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + removeWhitespace(file.originalname));
  },
});

// create a multer upload object
const upload = multer({ storage: assetStorage });

// export it
module.exports = upload;
