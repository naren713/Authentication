const express = require("express");

const router = express.Router();

const Users = require("../models/Users");

const authenticate = require("../verifyTokens");

router.get("/", authenticate, (req, res) => {
  Users.findOne({ _id: req.user }).then((data) => {
    res.render("homePage", { data });
  });
  // res.send(req.user);
});

module.exports = router;
