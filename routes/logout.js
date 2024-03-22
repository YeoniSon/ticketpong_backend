const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  req.session.isLogined = false;
  req.session.userId = "";
  res.clearCookie("userId");
  res.redirect("/login");
});
module.exports = router;
