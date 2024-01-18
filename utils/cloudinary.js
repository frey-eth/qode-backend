const cloudinary = require("cloudinary");

const cloudinaryUploadImg = async (file) => {
  cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.SECRET_KEY,
  });
  return new Promise((resolve) => {
    cloudinary.uploader.upload(file, (result) => {
      resolve(
        {
          url: result.secure_url,
          asset_id: result.asset_id,
          public_id: result.public_id,
        },
        {
          resource_type: "auto",
        },
        {
          eager: [
            { width: 300, height: 300, crop: "pad", audio_codec: "none" },
          ],
        }
      );
    });
  });
};

const cloudinaryDeleteImg = async (file) => {
  cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.SECRET_KEY,
  });
  return new Promise((resolve) => {
    cloudinary.uploader.destroy(file, (result) => {
      resolve(
        {
          url: result.secure_url,
          asset_id: result.asset_id,
          public_id: result.public_id,
        },
        {
          resource_type: "auto",
        }
      );
    });
  });
};

module.exports = { cloudinaryUploadImg, cloudinaryDeleteImg };
