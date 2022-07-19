//---------------------IMPORTS---------------------//
const multer = require("multer");

// configure where to send assets to
const assetStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/assets");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + file.originalname);
  },
});

// create a multer upload object
const upload = multer({ storage: assetStorage });

// export it
module.exports = upload;
