var express = require("express");
var router = express.Router();
const db = require("../database.js");

var showdown = require('showdown');
const { text } = require("express");
converter = new showdown.Converter();

router.use(express.json());
router.use(express.urlencoded({extended: false})); 
const urlencodedParser = express.urlencoded({extended: false});

/* GET home page. */
router.get("/:id/show", function (req, res, next) {
  var sql = "SELECT * FROM post WHERE id = ? ";
  var params = [req.params.id];
  db.get(sql, params, (err, row) => {
    if (err) {
      res.status(400);
      res.send("database error:" + err.message);
      return;
    }
    var params = [req.params.id];
    var sql1 = "SELECT * FROM comment INNER JOIN user ON comment.userId = user.id WHERE idPost = ?";
    db.all(sql1, params, (err, rowcom) => {
      if (err) {
        res.status(400);
        res.send("database error:" + err.message);
        return;
      }

      article = converter.makeHtml(row["text"]);
      const date = new Date(row["date"]).toLocaleDateString('en-us', { weekday: "long", year: "numeric", month: "short", day: "numeric", hour: "numeric", minute: "numeric", second: "numeric" });

      //console.log(rowcom);
      res.render("show", {
        title: "Post | Newspaper",
        post: row,
        comments: rowcom,
        date: date,
        article: article,
        activePage: "article",
        error: "",
      });
    });
  });
});

router.post("/:id/show", urlencodedParser, function (req, res) {
  var data = [req.body.comment, res.locals.currentUser["id"], req.params.id];
  console.log(req.body);
  var sql =
    "INSERT INTO comment (comment, userId, idPost) VALUES (?,?,?)";
  db.run(sql, data, function (err, result) {
    if (err) {
      res.status(400);
      res.send("database error:" + err.message);
      return;
    }
    res.redirect("show");
  });
});


router.get("/:id/delete", function (req, res) {
  var sql = "DELETE FROM post WHERE id = ?";
  var params = [req.params.id];
  db.get(sql, params, (err, row) => {
    if (err) {
      res.status(400);
      res.send("database error:" + err.message);
      return;
    }
    res.redirect("/");
  });
});

module.exports = router;
