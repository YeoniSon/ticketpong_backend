const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  delete req.session.isLogined;
  delete req.session.userId;
  res.clearCookie("userId");
  res.redirect("/login");
});

module.exports = router;
