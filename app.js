var createError = require("http-errors");
var express = require("express");
const session =  require('express-session') ;
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

const db = require("./database.js");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var loginRouter = require("./routes/login");
var registerRouter = require("./routes/register");
var addArticleRouter = require("./routes/add_article");
var articleRouter = require("./routes/article");
var logoutRouter = require("./routes/logout");
var profileRouter = require("./routes/profile");

var app = express();

var compression = require('compression');
app.use(compression());

app.use(session({secret: 'obydul', saveUninitialized: false, resave: false}));

function setCurrentUser(req, res, next) {
  if (req.session.loggedIn) {
    var sql = "SELECT * FROM user WHERE id = ?";
    var params = [req.session.userId];
    db.get(sql, params, (err, row) => {
      if (row !== undefined) {
        res.locals.currentUser = row;
      }
      return next();
    });
  } else {
    return next();
  }
}
app.use(setCurrentUser);

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(
  "/css",
  express.static(path.join(__dirname, "node_modules/bootstrap/dist/css"))
);
app.use(
  "/js",
  express.static(path.join(__dirname, "node_modules/bootstrap/dist/js"))
);
app.use(
  "/js",
  express.static(path.join(__dirname, "node_modules/jquery/dist"))
);
app.use(logger("dev"));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use("/jquery", express.static(__dirname + "/node_modules/jquery/dist/"));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/login", loginRouter);
app.use("/register", registerRouter);
app.use("/add_article", addArticleRouter);
app.use("/articles", articleRouter);
app.use("/profile",profileRouter);
app.use("/logout", logoutRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

module.exports = app;