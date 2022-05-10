const router = require("express").Router(),
  { getAllTransactions } = require("./controller"),
  { authenticateUser } = require("../../../middlewares/auth");

router.get("/", authenticateUser, getAllTransactions);

module.exports = router;
