var express = require("express");
var router = express.Router();
const db = require("../database.js");

var showdown  = require('showdown');
const { text } = require("express");
converter = new showdown.Converter();

/* GET home page. */
router.get("/:id/show", function (req, res, next) {
  var sql = "SELECT * FROM post WHERE id = ?";
  var params = [req.params.id];
  db.get(sql, params, (err, row) => {
    if (err) {
      res.status(400);
      res.send("database error:" + err.message);
      return;
    }

    article = converter.makeHtml(row["text"]);

    res.render("show", {
      title: "Post | Newspaper",
      post: row,
      article: article,
      activePage: "article",
      error: "",
    });
  });
});

module.exports = router;
