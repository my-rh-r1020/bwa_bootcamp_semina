const router = require("express").Router(),
  { getAllEvents } = require("./controller"),
  { authenticateUser } = require("../../../middlewares/auth");

router.get("/", authenticateUser, getAllEvents);

module.exports = router;
