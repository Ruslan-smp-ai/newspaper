var express = require('express');
var router = express.Router();

const db = require("../database.js");

/* GET home page. */
/*router.get('/', function(req, res, next) {
  res.render('index', { title: 'Newspaper' });
});*/

router.get("/", function (req, res) {
  var sql = "SELECT post.id, post.title, post.text, post.description, post.image, category.name FROM post LEFT JOIN category ON post.categoryId = category.id";
  db.all(sql, [], (err, rows) => {
    if (err) {
      res.status(400);
      res.send("database error:" + err.message);
      return;
    }
    res.render("index", { title: 'Newspaper', activePage: "index", posts: rows });
  });
});

router.get("/news", function (req, res) {
  var sql = "SELECT post.id, post.title, post.text, post.description, post.image, category.name FROM post LEFT JOIN category ON post.categoryId = category.id WHERE categoryId = 1";
  db.all(sql, [], (err, rows) => {
    if (err) {
      res.status(400);
      res.send("database error:" + err.message);
      return;
    }
    res.render("index", { title: 'Newspaper', activePage: "index", posts: rows });
  });
});

router.get("/politics", function (req, res) {
  var sql = "SELECT post.id, post.title, post.text, post.description, post.image, category.name FROM post LEFT JOIN category ON post.categoryId = category.id WHERE categoryId = 2";
  db.all(sql, [], (err, rows) => {
    if (err) {
      res.status(400);
      res.send("database error:" + err.message);
      return;
    }
    res.render("index", { title: 'Newspaper', activePage: "index", posts: rows });
  });
});

router.get("/sport", function (req, res) {
  var sql = "SELECT post.id, post.title, post.text, post.description, post.image, category.name FROM post LEFT JOIN category ON post.categoryId = category.id WHERE categoryId = 3";
  db.all(sql, [], (err, rows) => {
    if (err) {
      res.status(400);
      res.send("database error:" + err.message);
      return;
    }
    res.render("index", { title: 'Newspaper', activePage: "index", posts: rows });
  });
});

router.get("/culture", function (req, res) {
  var sql = "SELECT post.id, post.title, post.text, post.description, post.image, category.name FROM post LEFT JOIN category ON post.categoryId = category.id WHERE categoryId = 4";
  db.all(sql, [], (err, rows) => {
    if (err) {
      res.status(400);
      res.send("database error:" + err.message);
      return;
    }
    res.render("index", { title: 'Newspaper', activePage: "index", posts: rows });
  });
});

router.get("/covid", function (req, res) {
  var sql = "SELECT post.id, post.title, post.text, post.description, post.image, category.name FROM post LEFT JOIN category ON post.categoryId = category.id WHERE categoryId = 5";
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