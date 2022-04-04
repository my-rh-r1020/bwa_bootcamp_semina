const express = require("express"),
  router = express.Router(),
  { getAllUser } = require("./controller");

router.get("/users", getAllUser);

module.exports = router;
