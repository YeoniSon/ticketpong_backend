const express = require("express");
const router = express.Router();
const dbconn = require("../../model/dbPool");
let bcrypt = require("bcrypt-nodejs");

router.get("/", (req, res) => {
  res.render("member/signup", { title: "signup" });
});

router.post("/signup", (req, res) => {
  return res.render("member/signup", { title: "signup" });
});

router.post("/", async (req, res, next) => {
  let {
    userid,
    username,
    password,
    repassword,
    useremail,
    userphone,
    address,
    detailAddress,
  } = req.body;
  if (password !== repassword) {
    return res.send(
      '<script>alert("비밀번호가 일치하지 않습니다."); location.href="/signup";</script>'
    );
  }
  let hash = bcrypt.hashSync(password);
  let sql = `INSERT INTO member VALUES ('${userid}', '${username}', '${hash}', '${useremail}', '${userphone}', '${address}', '${detailAddress}')`;
  console.log(sql);

  dbconn.query(sql, (err, result) => {
    if (err) {
      console.log(err);
      return res.send(
        '<script>alert("회원가입에 실패하였습니다."); location.href="/signup";</script>'
      );
    }
    console.log("회원가입 성공");
    return res.redirect("/login");
  });
});

module.exports = router;
