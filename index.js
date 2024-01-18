const express = require("express");
const app = express();
const dotenv = require("dotenv").config();
const dbConnect = require("./dbConnect");
const PORT = process.env.PORT || 4000;
const cors = require("cors");
const bodyParser = require("body-parser");

const blogRouter = require("./routes/blogRoute");
const uploadRouter = require("./routes/uploadRoute");

dbConnect();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/api/blog", blogRouter);
app.use("/api/upload", uploadRouter);

app.listen(PORT, () => {
  console.log("Server is running at PORT:", PORT);
});
