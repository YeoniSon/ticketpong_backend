const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("manage/manageMain", {
    title: "관리자페이지 Main",
    managename: req.session.manageId,
    isLogined: req.session.isLogined,
  });
});

module.exports = router;
