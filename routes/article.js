var express = require("express");
var router = express.Router();
const db = require("../database.js");

var showdown = require('showdown');
const { text } = require("express");
converter = new showdown.Converter();

const multer  = require('multer')
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/usersImages/')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now())
  }
})

const upload = multer({ storage: storage })

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

router.post("/:id/edit", urlencodedParser, upload.single('articleImage'), function (req, res) {
  if (!req.file) {
    error = "No file received";
    res.render("edit_article", { activePage: "edit_article", error: error, title: 'Edit article | Newspaper' });
    return;
  };

  var data = [req.body.title, req.body.description, req.body.text, req.file.filename, req.body.category, req.params.id];
  var sql = "UPDATE post SET title = ?, description = ?, text = ?, image = ?, categoryId = ? WHERE id = ?";
  db.run(sql, data, function (err, result) {
    if (err) {
      res.status(400);
      res.send("database error:" + err.message);
      return;
    }
    res.redirect("../../");
  });
});

router.get("/:id/edit", function (req, res) {
  var sql = "SELECT * FROM post WHERE id = ?";
  var params = [req.params.id];
  db.get(sql, params, (err, row) => {
    if (err) {
      res.status(400);
      res.send("database error:" + err.message);
      return;
    }
    res.render("edit_article", {
      title: "Edit article | Newspaper",
      article: row,
      activePage: "article",
      error: "",
    });
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
