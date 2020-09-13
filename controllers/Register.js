const express = require("express");

const router = express.Router();

const Users = require("../models/Users");

const { registerValidation } = require("../validate");

const bcrypt = require("bcrypt");

router.get("/register", (req, res) => {
  res.render("register");
});

router.post("/register", async (req, res) => {
  // Validate the data before creating a User
  const { error } = registerValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // Check if the email is already registered
  const emailExists = await Users.findOne({ email: req.body.email });
  if (emailExists) return res.status(400).send("Email already Registered");

  // Encrypt the Password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  // Create a new User
  const user = new Users({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword,
  });
  try {
    const savedUser = await user.save();
    res.redirect("/login");
  } catch {
    res.sendStatus(404);
  }
});

module.exports = router;
