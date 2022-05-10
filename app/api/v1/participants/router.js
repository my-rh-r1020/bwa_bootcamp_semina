const router = require("express").Router(),
  { signup, signin } = require("./controller");

router.post("/participants/auth/signup", signup);
router.post("/participants/auth/signin", signin);

module.exports = router;
