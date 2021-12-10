var express = require("express");
var router = express.Router();
const db = require("../database.js");

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
router.use(express.urlencoded({ extended: false }));
const urlencodedParser = express.urlencoded({ extended: false });

router.get("/", function (req, res, next) {
  res.render("add_article", { title: "New Article | Newspaper", error: "" });
});

router.post("/", urlencodedParser, upload.single('articleImage'), function (req, res) {
  

  if (!req.file) {
    error = "No file received";
    res.render("/", { activePage: "add_article", error: error, title: 'Add article| Newspaper' });
    return;
    };

  var data = [req.body.title, req.body.text, req.file.filename];
  var sql = "INSERT INTO post (title, text, image, userId) VALUES (?,?,?,1)";
  db.run(sql, data, function (err, result) {
    if (err) {
      res.status(400);
      res.send("database error:" + err.message);
      return;
    }
    res.redirect("../");
  });
});
module.exports = router;
