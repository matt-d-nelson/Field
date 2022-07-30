//---------------------IMPORTS---------------------//
const cloudinary = require("cloudinary").v2;
const dotenv = require("dotenv");

dotenv.config();

//---------------------CLOUDINARY---------------------//
// configure cloudinary object with environment variables
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

function cloudUpload(file, folder) {
  return new Promise((resolve) => {
    cloudinary.uploader.upload(
      file,
      (result) => {
        resolve({
          url: result.url,
        });
      },
      {
        folder: folder,
      }
    );
  });
}

module.exports = cloudUpload;
