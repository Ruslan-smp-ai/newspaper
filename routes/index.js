var express = require('express');
var router = express.Router();

var dayjs = require('dayjs')
var relativeTime = require('dayjs/plugin/relativeTime')
dayjs.extend(relativeTime)
var customParseFormat = require('dayjs/plugin/customParseFormat')
dayjs.extend(customParseFormat)

router.use(express.json());
router.use(express.urlencoded({extended: false})); 
const urlencodedParser = express.urlencoded({extended: false});

const db = require("../database.js");
const sqlr = "SELECT post.id, post.title, post.text, post.description, post.image, category.name, post.date FROM post left JOIN category ON post.categoryId = category.id WHERE category.name = "
/* GET home page. */
/*router.get('/', function(req, res, next) {
  res.render('index', { title: 'Newspaper' });
});*/

router.get("/", function (req, res) {
  var sql = "SELECT post.id, post.title, post.text, post.description, post.image, category.name, post.date FROM post LEFT JOIN category ON post.categoryId = category.id";
  db.all(sql, [], (err, rows) => {
    if (err) {
      res.status(400);
      res.send("database error:" + err.message);
      return;
    }
    res.render("index", { title: 'Newspaper', activePage: "index", posts: rows, dayjs: dayjs });
  });
});

router.post("/search", urlencodedParser, function (req, res) {
  var sql = "SELECT post.id, post.title, post.text, post.description, post.image, category.name, post.date FROM post LEFT JOIN category ON post.categoryId = category.id WHERE post.title LIKE '%" + req.body.search + "%'";
  db.all(sql, [], (err, rows) => {
    if (err) {
      res.status(400);
      res.send("database error:" + err.message);
      return;
    }
    res.render("index", { title: 'Newspaper', activePage: "index", posts: rows, dayjs: dayjs, search: req.body.search });
  });
});

router.get("/news", function (req, res) {
  var sql = sqlr + "'News'";
  db.all(sql, [], (err, rows) => {
    if (err) {
      res.status(400);
      res.send("database error:" + err.message);
      return;
    }
    res.render("index", { title: 'Newspaper', activePage: "index", posts: rows, dayjs: dayjs });
  });
});

router.get("/politics", function (req, res) {
  var sql = sqlr + "'Politics'";
  db.all(sql, [], (err, rows) => {
    if (err) {
      res.status(400);
      res.send("database error:" + err.message);
      return;
    }
    res.render("index", { title: 'Newspaper', activePage: "index", posts: rows, dayjs: dayjs });
  });
});

router.get("/sport", function (req, res) {
  var sql = sqlr + "'Sport'";
  db.all(sql, [], (err, rows) => {
    if (err) {
      res.status(400);
      res.send("database error:" + err.message);
      return;
    }
    res.render("index", { title: 'Newspaper', activePage: "index", posts: rows, dayjs: dayjs });
  });
});

router.get("/culture", function (req, res) {
  var sql = sqlr + "'Culture'";
  db.all(sql, [], (err, rows) => {
    if (err) {
      res.status(400);
      res.send("database error:" + err.message);
      return;
    }
    res.render("index", { title: 'Newspaper', activePage: "index", posts: rows, dayjs: dayjs });
  });
});

router.get("/covid", function (req, res) {
  var sql = sqlr + "'Covid'";
  db.all(sql, [], (err, rows) => {
    if (err) {
      res.status(400);
      res.send("database error:" + err.message);
      return;
    }
    res.render("index", { title: 'Newspaper', activePage: "index", posts: rows, dayjs: dayjs });
  });
});

module.exports = router;