const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  delete req.session.isLogined;
  delete req.session.manageId;
  res.clearCookie("manageId");
  res.redirect("/manage");
});

module.exports = router;
