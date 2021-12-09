var express = require('express');
var router = express.Router();

const db = require("../database.js");

router.use(express.json());
router.use(express.urlencoded({extended: false})); 
const urlencodedParser = express.urlencoded({extended: false});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('login', { title: 'Login | Newspaper' });
});

router.post("/", urlencodedParser, function (req, res) {
  var sql = "SELECT * FROM user WHERE email = ?";
  var params = [req.body.email];
  var error = "";
  db.get(sql, params, (err, row) => {
    if (err) {
      error = err.message;
    }
    if (row === undefined) {
      error = "Wrong email or password";
    } else if (row["failed_logins"] > 2) {
      error = "Three failed logins";
    }
    if (error !== "") {
      res.render("login", { activePage: "login", error: error });
      return;
    }
    bcrypt.compare(req.body.password, row["password"], function (err, hashRes) {
      if (hashRes === false) {
        error = "Wrong email or password";

        var sql = "UPDATE users SET failed_logins = failed_logins + 1";
        db.run(sql, function (err, result) {
          if (err) {
            res.status(400);
            res.send("database error:" + err.message);
            return;
          }
        });

        res.render("login", { activePage: "login", error: error });
        return;
      }
      req.session.userId = row["id"];
      req.session.loggedIn = true;
      res.redirect("/");
    });
  });
});

module.exports = router;
