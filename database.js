var sqlite3 = require("sqlite3").verbose();

var DBSOURCE = "./db.sqlite";

var db = new sqlite3.Database(DBSOURCE, (err) => {
  if (err) {
    // Cannot open database
    console.error(err.message);
    throw err;
  } else {
    console.log("Connected to the SQLite database.");
    db.run(
      `CREATE TABLE post (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title text,
    description text,
    text text,
    image text,
    date text,
    userId integer,
    FOREIGN KEY (userId) REFERENCES user(id)
    )`,
      (err) => {
        if (err) {
          console.log("Table posts id already created:" + err.message);
        } else {
          console.log("Table posts is created");
        }
      }
    );
    db.run(
      `CREATE TABLE comment (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    author text,
    comment text,
    idPost integer,
    FOREIGN KEY (idPost) REFERENCES post(id)
    )`,
      (err) => {
        if (err) {
          console.log("Table comments id already created:" + err.message);
        } else {
          console.log("Table comments is created");
        }
      }
    );
    db.run(
      `CREATE TABLE user (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name text,
      email text UNIQUE,
      image text,
      password text,
      failed_logins INTEGER,
      CONSTRAINT email_unique UNIQUE (email)
      )`,
      (err) => {
        if (err) {
          console.log("Table users is already created");
        } else {
          console.log("Table users is created");
        }
      }
    );
    db.run(
      `CREATE TABLE tag (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name text
      )`,
      (err) => {
        if (err) {
          console.log("Table tag is already created");
        } else {
          console.log("Table tag is created");
        }
      }
    );
    db.run(
      `CREATE TABLE tagpost (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      idPost integer,
      idTag integer,
      FOREIGN KEY (idPost) REFERENCES posts(id),
      FOREIGN KEY (idTag) REFERENCES tag(id)
      )`,
      (err) => {
        if (err) {
          console.log("Table tagpost is already created");
        } else {
          console.log("Table tagpost is created");
        }
      }
    );
  }
});

module.exports = db;