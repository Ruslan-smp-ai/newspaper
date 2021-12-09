var express = require("express");
var router = express.Router();
const db = require("../database.js");

router.use(express.json());
router.use(express.urlencoded({ extended: false }));
const urlencodedParser = express.urlencoded({ extended: false });

router.get("/", function (req, res, next) {
  res.render("add_article", { title: "New Article | Newspaper" });
});

router.post("/", urlencodedParser, function (req, res) {
  var data = [req.body.title, req.body.text];
  var sql = "INSERT INTO post (title, text, userId) VALUES (?,?,1)";
  db.run(sql, data, function (err, result) {
    if (err) {
      res.status(400);
      res.send("database error:" + err.message);
      return;
    }
    res.render("index", {
      activePage: "add_article",
      formData: req.body,
      title: "Newspaper",
    });
  });
});
module.exports = router;
