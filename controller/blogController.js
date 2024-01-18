const Blog = require("../models/blogModel");
const validateMongoDbId = require("../utils/validateMongodbId");
const expressAsyncHandler = require("express-async-handler");
const cloudinaryUploadImg = require("../utils/cloudinary");
const fs = require("fs");

const createBlog = expressAsyncHandler(async (req, res) => {
  try {
    const newBlog = await Blog.create(req.body);
    res.json({
      status: "success",
      newBlog,
    });
  } catch (err) {
    throw new Error(err);
  }
});

const getBlog = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const getBlog = await Blog.findById(id)
      .populate("likes")
      .populate("dislikes");
    const updateView = await Blog.findByIdAndUpdate(
      id,
      {
        $inc: { numViews: 1 },
      },
      {
        new: true,
      }
    );
    res.json(getBlog);
  } catch (err) {
    throw new Error(err);
  }
});

const getAllBlog = expressAsyncHandler(async (req, res) => {
  try {
    const allBlog = await Blog.find();
    res.json(allBlog);
  } catch (err) {
    throw new Error(err);
  }
});

const submitComment = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);

  try {
    const { name, comment } = req.body;

    const updatedBlog = await Blog.findByIdAndUpdate(
      id,
      {
        $push: { comments: { name, comment } },
      },
      { new: true }
    );

    res.json(updatedBlog);
  } catch (err) {
    throw new Error(err);
  }
});
const uploadImage = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const uploader = (path) => cloudinaryUploadImg(path, "blogs");
    const urls = [];
    const files = req.files;
    for (const file of files) {
      const { path } = file;
      const newPath = await uploader(path);
      urls.push(newPath);
      fs.unlinkSync(path);
    }
    const findBlog = await Blog.findByIdAndUpdate(
      id,
      {
        images: urls.map((file) => {
          return file;
        }),
      },
      { new: true }
    );
    res.json(findBlog);
  } catch (err) {
    throw new Error(err);
  }
});



module.exports = {
  createBlog,
  submitComment,
  uploadImage,
  getBlog,
  getAllBlog
};
