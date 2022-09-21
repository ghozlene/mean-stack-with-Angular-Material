const express = require("express");
require("dotenv").config();
const app = express();
const bodyParser = require("body-parser");
const Post = require("./models/post");
const mongoose = require("mongoose");

mongoose
  .connect(
    `mongodb+srv://achref:${process.env.PASSWORD}@cluster0.qr5d3fe.mongodb.net/?retryWrites=true&w=majority`
  )
  .then(() => {
    console.log("connect to Database");
  })
  .catch((err) => {
    console.log(err);
  });

const posts = [
  {
    id: "f1a4ada2",
    title: "first server side post",
    content: "this is comming from server",
  },

  {
    id: "f1a4142525ada2",
    title: "second server side post",
    content: "this is comming from server !!!",
  },
];

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
  console.log(post);

  res.status(201).json({ message: "data added successfully" });
});

app.get("/api/posts", (req, res, next) => {
  res.status(200).json({
    message: "posts fetched with success",
    posts,
  });
});

module.exports = app;
