var express = require('express');
var router = express.Router();
const db = require("../database.js");
const bcrypt = require("bcrypt");
const multer  = require('multer')
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/avatarsImages/')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now())
  }
})
var bodyParser = require('body-parser');
router.use(express.json());
router.use(express.urlencoded({ extended: false }));
const urlencodedParser = express.urlencoded({ extended: false });
router.use(bodyParser.urlencoded({ extended: true }));
const upload = multer({ storage: storage })
/* GET home page. */
function checkAuth(req, res, next) {
  if (req.session.loggedIn) {
    return next();
  } else {
    res.redirect("/login");
  }
}
router.use(checkAuth);

router.get("/", checkAuth, function (req, res) {
  res.render("profile", { activePage: "profile", title: "Profile | Newspaper" });
});

router.post("/", urlencodedParser, upload.single('avatarImage'), function (req, res) {
  if (!req.file) {
    console.log("Ошибка");
    error = "No file received";
    res.render("profile", { activePage: "profile", error: error, title: 'Profile | Newspaper' });
    return;
    };

    bcrypt.hash(req.body.password, 10, function (err, hash) {
      var data = [req.body.name, req.body.email, hash, req.file.filename, req.session.userId];
      var sql = `UPDATE user SET
      name = COALESCE(?,name),
      email = COALESCE(?,email),
      password = COALESCE(?,password),
      image = COALESCE(?,image)
      WHERE id = ?`;
      db.run(sql, data, function (err, result) {
        if (err) {
          res.status(400);
          res.send("database error:" + err.message);
          return;
        }
        res.redirect("/");
      });
    });
  });
  


module.exports = router;