const express = require("express");
const app = express();
const bodyParser = require("body-parser");

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

app.post("/api/post", (req, res, next) => {
  const post = req.body;
  console.log(post);
  res.status(201).json({ message: "data added successfully" });
});
app.use("/api/posts", (req, res, next) => {
  res.status(200).json({
    message: "posts fetched with success",
    posts,
  });
});

module.exports = app;
