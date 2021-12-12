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
      `CREATE TABLE category (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name text
      )`,
      (err) => {
        if (err) {
          console.log("Table category is already created");
        } else {
          console.log("Table category is created");
          db.run(
            `INSERT INTO category (name) VALUES ('News'),
            ('Politics'),
            ('Sport'),
            ('Culture'),
            ('Covid');`,
            (err) => {
              if (err) {
                console.log("Inserts is already created " + err);
              } else {
                console.log("Inserts is created");
              }
            }
          );
        }
      }
    );
    db.run(
      `CREATE TABLE post (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title text,
    description text,
    text text,
    image text,
    date text,
    userId integer,
    categoryId integer,
    FOREIGN KEY (userId) REFERENCES user(id)
    FOREIGN KEY (categoryId) REFERENCES category(id)
    )`,
      (err) => {
        if (err) {
          console.log("Table post id already created:" + err.message);
        } else {
          console.log("Table post is created");
        }
      }
    );
    db.run(
      `CREATE TABLE comment (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    userId integer,
    comment text,
    idPost integer,
    FOREIGN KEY (idPost) REFERENCES post(id)
    FOREIGN KEY (userId) REFERENCES user(id)
    )`,
      (err) => {
        if (err) {
          console.log("Table comment id already created:" + err.message);
        } else {
          console.log("Table comment is created");
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
          console.log("Table user is already created");
        } else {
          console.log("Table user is created");
        }
      }
    );
  }
});

module.exports = db;