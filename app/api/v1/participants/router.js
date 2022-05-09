const router = require("express").Router(),
  { signup } = require("./controller");

router.post("/participants/auth/signup", signup);

module.exports = router;
