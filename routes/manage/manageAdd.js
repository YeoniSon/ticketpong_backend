const express = require("express");
const router = express.Router();
const dbconn = require("../../model/dbPool");
let bcrypt = require("bcrypt-nodejs");

router.get("/", (req, res) => {
  res.render("manage/manageAdd", { title: "관리자 추가" });
});

router.post("/manageAdd", (req, res) => {
  return res.render("manage/manageAdd", { title: "관리자 추가" });
});

router.post("/", async (req, res, next) => {
  let { id, name, password, repassword, phone, role, part } = req.body;
  if (password !== repassword) {
    return res.send(
      '<script>alert("비밀번호가 일치하지 않습니다."); location.href="/manage/manageAdd";</script>'
    );
  }
  let hash = bcrypt.hashSync(password);
  let sql = `INSERT INTO MANAGE VALUES ('${id}', '${name}', '${hash}', '${phone}', '${role}', '${part}')`;
  console.log(sql);

  dbconn.query(sql, (err, result) => {
    if (err) {
      console.log(err);
      return res.send(
        '<script>alert("관리자 등록에 실패하였습니다."); location.href="manage/manageAdd";</script>'
      );
    }
    console.log("관리자 등록 성공");
    return res.redirect("/manageMain");
  });
});

module.exports = router;
