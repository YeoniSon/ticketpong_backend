const express = require("express");
const router = express.Router();
const dbconn = require("../config/mariadb");
let bcrypt = require("bcrypt-nodejs");

router.get("/", (req, res) => {
  res.render("login", { title: "login" });
});

router.get("/login", (req, res) => {
  res.render("login", { title: "login" });
});

router.post("/", (req, res, next) => {
  let { id, pw } = req.body;
  let sql = `SELECT * FROM MEMBER WHERE user_id = '${id}'`;
  console.log(sql, id, pw);

  dbconn.db.query(sql, (err, result) => {
    if (err || result.length === 0) {
      return res.render("error", { message: "아이디가 존재하지 않습니다." });
    }

    console.log(result[0].user_id, result[0].user_password);

    bcrypt.compare(pw, result[0].user_password, (err, isMatch) => {
      if (err || !isMatch) {
        return res.render("error", { message: "패스워드 오류입니다." });
      } else {
        // 로그인 성공 시 쿠키 설정
        res.cookie("userId", id, {
          expires: new Date(Date.now() + 3600000),
          httpOnly: true,
        }); // 쿠키에 사용자 ID 저장, 15분 동안 유효
        // 세션에 사용자 ID 저장 (선택적)
        req.session.userId = result[0].user_id;
        req.session.isLogined = true;
        res.redirect("/main");
      }
    });
  });
});

module.exports = router;
