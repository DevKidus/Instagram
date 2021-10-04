const express = require("express");
const { create, newsFeed, allPostsOf } = require("../database/post");

const { verifyToken } = require("../helpers/token");
const { rand } = require("../helpers/utilities");
const { validateNewPost } = require("../helpers/validate");

const post = express.Router();

post.use(express.json());

post.post("/create", verifyToken, async (req, res) => {
  if (req.err) return res.json({ error: req.err });

  const isValid = validateNewPost(req.body);

  if (isValid.length > 0) return res.json(isValid);

  const postId = rand(80);
  const userId = req.unique_id;
  const date = new Date().getTime();

  const response = await create(
    postId,
    userId,
    req.body.content,
    req.body.image,
    date
  );

  if (response.affectedRows > 0)
    return res.status(200).json({ message: "posted successfully" });

  res.json({
    message: "post not valid due to internal errors, try again later!!!",
  });
});

post.get("/newsfeed", verifyToken, async (req, res) => {
  if (req.err) return res.json(req.err);

  const result = await newsFeed(req.unique_id);

  res.status(200).json(result);
});

module.exports = post;
