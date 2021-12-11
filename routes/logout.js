var express = require("express");
var router = express.Router();

/* GET users listing. */
router.get("/", function (req, res, next) {
  req.session.userId = null;
  req.session.loggedIn = false;
  res.redirect("/");
});

module.exports = router;
