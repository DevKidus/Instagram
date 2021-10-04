const express = require("express");
const dotenv = require("dotenv");
const { isEmailExist } = require("../database/user");
const { signup, login } = require("../database/auth");
const { generateToken } = require("../helpers/token");
const { rand, genUsername } = require("../helpers/utilities");
const { validateSignup, validateLogin } = require("../helpers/validate");

const auth = express.Router();

dotenv.config();

auth.use(express.json());

auth.post("/signup", async (req, res) => {
  const errors = validateSignup(req.body);

  if (errors.length > 0) return res.send(errors);

  try {
    const response = await isEmailExist(req.body.email);

    if (response.length > 0)
      return res.json({ message: "Email already exists" });

    const unique_id = rand(40);
    const username = await genUsername(req.body.firstname);

    const reg = await signup({ ...req.body }, unique_id, username);

    if (reg.affectedRows) {
      const token = generateToken({ unique_id: unique_id });
      res.setHeader("Set-Cookie", `jwt=${token}`);
      return res.status(200).json({ message: "registered successfully!!!" });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Internal server error" });
  }
});
auth.post("/login", async (req, res) => {
  const errors = validateLogin(req.body);

  if (errors.length > 0) return res.json(errors);

  const response = await login(req.body);

  if (response.length > 0) {
    const token = generateToken({ unique_id: response[0].unique_id });
    res.setHeader("Set-Cookie", `jwt=${token}`);

    return res.status(200).json({ message: "login succesfully" });
  }

  return res.json({ message: "user not found!!!" });
});

module.exports = auth;
