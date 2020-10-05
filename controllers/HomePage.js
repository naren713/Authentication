const express = require("express");

const router = express.Router();

const Users = require("../models/Users");

const authenticate = require("../verifyTokens");

router.get("/", authenticate, (req, res) => {
  res.render("homePage");
  // res.send(req.user);
});

module.exports = router;
