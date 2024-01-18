const express = require("express");
const { uploadImage, deleteImage } = require("../controller/uploadController");
const { uploadPhoto } = require("../middleware/uploadImages");

const router = express.Router();
router.post("/", uploadPhoto.array("images", 10), uploadImage);
router.delete("/:id", deleteImage);

module.exports = router;
