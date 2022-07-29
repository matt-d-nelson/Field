//---------------------IMPORTS---------------------//
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");

//---------------------HELPER FUNCTIONS---------------------//
// unused with cloudinary file upload / keeping as a momento <3
function removeWhitespace(filename) {
  const returnFilename = filename.split(" ");
  return returnFilename.join("");
}

//---------------------CLOUDINARY---------------------//
// configure cloudinary object with environment variables
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

//---------------------MULTER---------------------//
// configure where to send assets to
const assetStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "field",
    resource_type: "auto",
  },
});

// create a multer upload object
const upload = multer({ storage: assetStorage });

// export it
module.exports = upload;
