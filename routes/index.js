const express = require("express");
const router = express.Router();

router.get("/", (req, res, next) => {
  console.log("환영합니다.");
  res.render("index", { title: "Main" }); // views/index.ejs 파일을 렌더링
});

module.exports = router;
