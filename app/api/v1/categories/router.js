const router = require("express").Router(),
  { getAllCategory } = require("./controller"),
  { authenticateUser } = require("../../../middlewares/auth");

router.get("/", authenticateUser, getAllCategory);

module.exports = router;
