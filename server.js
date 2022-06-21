const express = require("express");
const path = require("path");
const db = require("./index.js");
const app = express();

const http = require("http").createServer(app);
http.listen(8084, function () {
  console.log("listening on 8084");
});

// __dirname: 현재경로, public 폴더에 있는 것을 전역으로 쓰겠다
//app.use(express.static(path.join(__dirname, "tabMenu/screens")));

app.use(express.static(path.join("./")));

app.get("/insertBook", (req, res) => {
  const { refUserNo, isbn, imgPath, title, author, page } = req.query;

  db.connection.query(
    `insert into book(refUserNo, isbn, imgPath, title, author, page) values(${refUserNo}, ${isbn}, "${imgPath}", "${title}", "${author}", ${page});`,
    (err, results) => {
      if (err) {
        console.log(err);
        res.status(400).end();
      }
      db.connection.query(
        `select bookNo, refUserNo from book order by bookNo desc;`,
        (err, results) => {
          if (err) {
            console.log(err);
            res.status(400).end();
          }
          res.json(results);
        }
      );
    }
  );
});

app.get("/insertTag", (req, res) => {
  const { bookNo, refTagNo1, refTagNo2, refTagNo3, refUserNo } = req.query;

  db.connection.query(
    `insert into usedTag(refBookNo, refTagNo, refUserNo) values(${bookNo}, ${refTagNo1}, ${refUserNo}), (${bookNo}, ${refTagNo2}, ${refUserNo}), (${bookNo}, ${refTagNo3}, ${refUserNo});`,
    (err, results) => {
      if (err) {
        console.log("insert", err);
        res.status(400).end();
      }
      res.status(200).end();
    }
  );
});

app.get("/detailBook", (req, res) => {
  db.connection.query(
    `select * from book where bookNo = ${req.query.bookNo}`,
    (err, results) => {
      if (err) {
        console.log(err);
        res.status(400).end();
      }
      res.json(results);
    }
  );
});

app.get("/library", (req, res) => {
  const op = req.query.reading == "true" ? " " : " not ";
  db.connection.query(
    `select * from book where refUserNo = ${req.query.refUserNo} and endDate is${op}null order by bookNo desc;`,
    (err, results) => {
      if (err) {
        console.log(err);
        res.status(400).end();
      }
      res.json(results);
    }
  );
});

app.get("/pageUpdate", (req, res) => {
  const end =
    req.query.readPage == req.query.page ? ", endDate = (current_date)" : "";
  console.log(req.query.readPage);
  console.log(req.query.bookNo);
  console.log(end);
  db.connection.query(
    `update book set readPage = ${req.query.readPage}${end} where bookNo = ${req.query.bookNo};`,
    (err, results) => {
      if (err) {
        console.log(err);
        res.status(400).end();
      }
      res.status(200).end();
    }
  );
});

app.get("/removeBook", (req, res) => {
  db.connection.query(
    `delete from book where bookNo = ${req.query.bookNo};`,
    (err, results) => {
      if (err) {
        console.log(err);
        res.status(400).end();
      }
      res.status(200).end();
    }
  );
});

app.get("/selectTags", (req, res) => {
  const { bookNo, refUserNo } = req.query;

  db.connection.query(
    `select tagName from tag where tagNo in (select refTagNo from usedTag where refBookNo = ${bookNo} and refUserNo = ${refUserNo});`,
    (err, results) => {
      if (err) {
        console.log(err);
        res.status(400).end();
      }
      console.log(String(results));
      res.json(results);
    }
  );
});
