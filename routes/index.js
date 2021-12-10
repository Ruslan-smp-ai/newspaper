var express = require('express');
var router = express.Router();

const db = require("../database.js");

/* GET home page. */
/*router.get('/', function(req, res, next) {
  res.render('index', { title: 'Newspaper' });
});*/

router.get("/", function (req, res) {
  var sql = "SELECT * FROM post";
  db.all(sql, [], (err, rows) => {
    if (err) {
      res.status(400);
      res.send("database error:" + err.message);
      return;
    }
    res.render("index", { title: 'Newspaper', activePage: "index", posts: rows });
  });
});

module.exports = router;