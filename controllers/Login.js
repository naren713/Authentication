const express = require("express");

const router = express.Router();

const Users = require("../models/Users");

const { loginValidation } = require("../validate");

const bcrypt = require("bcrypt");

const JWT = require("jsonwebtoken");

router.get("/login", (req, res) => {
  res.render("login");
});

router.post("/login", async (req, res) => {
  // Validate the data before authenticating user
  const { error } = loginValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // Check if the user is registered
  const user = await Users.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("Email not Registered");

  // Verify Password
  const validPass = await bcrypt.compare(req.body.password, user.password);
  if (!validPass) return res.status(400).send("Incorrect Password");

  // Create and assign a token
  const token = JWT.sign({ _id: user._id }, process.env.TOKEN_SECRET, {
    expiresIn: "1hr",
  });
  res.cookie("token", token, {
    maxAge: 1 * 1000 * 60 * 60, // Valid for 1 hour
    httpOnly: true,
    // sameSite: true,
  });
  res.redirect("/");

  // res.render("homePage", { token, name: user.name });
});

router.get("/logout", (req, res) => {
  res.clearCookie("token");
  res.redirect("/");
});

module.exports = router;
