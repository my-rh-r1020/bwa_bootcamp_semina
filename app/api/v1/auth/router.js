const router = require("express").Router(),
  { signup } = require("./controller");

router.post("/signup", signup);

module.exports = router;
