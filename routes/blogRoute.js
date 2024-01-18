const express = require("express");
const {
  createBlog,
  uploadImage,
  submitComment,
  getBlog,
  getAllBlog,
} = require("../controller/blogController");
const { uploadPhoto } = require("../middleware/uploadImages");
const router = express.Router();

router.post("/", createBlog);
router.put("/upload/:id", uploadPhoto.array("images", 4), uploadImage);
router.post("/submit-comment/:id", submitComment);
router.get("/:id", getBlog);
router.get("/", getAllBlog);

module.exports = router;
