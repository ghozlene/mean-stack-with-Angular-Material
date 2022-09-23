const express = require("express");
const cors = require("cors");
const path = require("path");
const app = express();
const bodyParser = require("body-parser");
const postsRoutes = require("./routes/posts");
const mongoose = require("mongoose");
require("dotenv").config();
mongoose
  .connect(
    `mongodb+srv://achref:${process.env.MONGODB_PASSWORD}@cluster0.qr5d3fe.mongodb.net/node-angular?retryWrites=true&w=majority`
  )
  .then(() => {
    console.log("connect to Database");
  })
  .catch((err) => {
    console.log(err);
  });

app.use(bodyParser.json());
app.use(cors());
app.use("/images", express.static(path.join("backend/images")));

app.use("/api/posts", postsRoutes);
module.exports = app;
