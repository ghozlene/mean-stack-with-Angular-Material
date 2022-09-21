const express = require("express");
const cors = require("cors");
const app = express();
const bodyParser = require("body-parser");
const Post = require("./models/post");
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

app.post("/api/posts", (req, res, next) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content,
  });
  post.save().then((ceatedPost) => {
    res
      .status(201)
      .json({ message: "data added successfully", postId: ceatedPost._id });
  });
});

app.get("/api/posts", (req, res, next) => {
  Post.find()
    .then((doc) => {
      res.status(200).json({
        message: "posts fetched with success",
        posts: doc,
      });
    })
    .catch((err) => {
      console.log(err);
    });
});

app.delete("/api/posts/:id", (req, res, next) => {
  Post.deleteOne({ _id: req.params.id }).then((result) => {
    console.log(result);
    res.status(200).json({
      message: "deleted with success",
    });
  });
});

module.exports = app;
