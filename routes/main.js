const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("main", {
    title: "main",
    username: req.session.userId,
    isLogined: req.session.isLogined,
  });
});
module.exports = router;
