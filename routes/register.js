var express = require("express");
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
const upload = multer({ storage: storage })
router.use(express.json());
router.use(express.urlencoded({ extended: false }));
const urlencodedParser = express.urlencoded({ extended: false });

router.get("/", function (req, res, next) {
  res.render("register", { title: "Register | Newspaper", error: "" });
});

router.post("/", urlencodedParser, upload.single('avatarImage'), function (req, res) {
  

  if (!req.file) {
    console.log("Ошибка");
    error = "No file received";
    res.render("register", { activePage: "register", error: error, title: 'Register | Newspaper' });
    return;
    };
  bcrypt.hash(req.body.password, 10, function (err, hash) {
    var data = [req.body.name, req.body.email, req.file.filename, hash];
    var sql =
      "INSERT INTO user (name, email, image, password, failed_logins) VALUES (?,?,?,?,0)";
    db.run(sql, data, function (err, result) {
      if (err) {
        res.status(400);
        res.send("database error:" + err.message);
        return;
      }
<<<<<<< HEAD
      res.redirect("../");
=======
      res.redirect("/");
>>>>>>> b2634d356cc0fce3196e6be2a7e27857a3341b2a
    });
  });
});
module.exports = router;
