const router = require("./HomePage");

const reouter = require("express").Router();

const jwtDecode = require("jwt-decode");

const cookieParser = require("cookie-parser");

const Users = require("../models/Users");

const authenticate = require("../verifyTokens");

router.get("/about", authenticate, (req, res) => {
  var token = req.cookies.token;
  var decoded = jwtDecode(token);
  Users.findOne({ _id: decoded._id }).then((user) => {
    res.render("about", { user });
  });
});

module.exports = router;
