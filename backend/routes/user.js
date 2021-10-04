const express = require("express");
const jwt = require("jsonwebtoken");
const { allPostsOf } = require("../database/post");
const {
  getUserById,
  follow,
  isFollowed,
  unfollow,
  iFollow,
  followMe,
} = require("../database/user");
const { verifyToken } = require("../helpers/token");

const user = express.Router();

user.use(express.json());

user.get("/profile", verifyToken, async (req, res) => {
  if (req.err) return res.json({ error: req.err });

  if (req.query.id) req.unique_id = req.query.id;

  const user = await getUserById(req.unique_id);
  const myPosts = await allPostsOf(req.unique_id);

  const data = myPosts.map((p) => {
    if (p.image) p.image = req.headers.host + "/images/" + p.image;
    return p;
  });

  const {
    unique_id,
    first_name,
    last_name,
    username,
    email,
    profile_img,
    bio,
    status,
  } = user[0];

  res.status(200).json({
    unique_id,
    first_name,
    last_name,
    username,
    email,
    profile_img: req.headers.host + "/images/" + profile_img,
    bio,
    status,
    posts: data,
  });
});

user.post("/follow", verifyToken, async (req, res) => {
  if (req.err) return res.json({ err: req.err });

  const id = req.query.id;

  if (!id) return res.json({ err: "Invalid follow user id" });

  const isExist = await getUserById(id);

  if (!(isExist.length > 0)) return res.json({ message: "user not found" });
  try {
    const is = await isFollowed(req.unique_id, id);

    if (is.length > 0) {
      const response = await unfollow(req.unique_id, id);

      if (response.affectedRows > 0)
        return res.json({ message: "unfollowed successfully!!!" });

      console.log(response);
    } else {
      const response = await follow(req.unique_id, id);

      if (response.affectedRows > 0)
        return res.json({ message: "followed successfully!!!" });
    }
  } catch (err) {
    console.log(err);
  }
});

user.get("/iFollow", verifyToken, async (req, res) => {
  if (req.err) return res.json(req.err);

  if (req.query.id) req.unique_id = req.query.id;

  const users = await iFollow(req.unique_id);

  const data = await Promise.all(
    users.map(async (u) => {
      const toUpdate = await getUserById(u.followee_id);

      if (toUpdate[0].profile_img)
        toUpdate[0].profile_img =
          req.headers.host + "/images/" + toUpdate[0].profile_img;

      return toUpdate[0];
    })
  );

  res.status(200).json(data);
});

user.get("/followMe", verifyToken, async (req, res) => {
  if (req.err) return res.json(req.err);

  if (req.query.id) req.unique_id = req.query.id;

  const users = await followMe(req.unique_id);

  const data = await Promise.all(
    users.map(async (u) => {
      const toUpdate = await getUserById(u.follower_id);

      if (toUpdate[0].profile_img)
        toUpdate[0].profile_img =
          req.headers.host + "/images/" + toUpdate[0].profile_img;

      return toUpdate[0];
    })
  );

  res.status(200).json(data);
});

module.exports = user;
