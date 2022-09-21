const express = require("express");

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

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin,X-Requested-With,Content-Type,Accept"
  );
  res.setHeader(
    "Acces-Control-Allow-Methods",
    "GET,POST,PATCH,DELETE,PUT,OPTIONS"
  );
  next();
});

app.post("/api/posts", (req, res, next) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content,
  });
  post.save();

  res.status(201).json({ message: "data added successfully" });
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

module.exports = app;
