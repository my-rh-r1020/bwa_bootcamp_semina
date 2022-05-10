const router = require("express").Router(),
  { signup, signin, landingPage } = require("./controller");

router.post("/participants/auth/signup", signup);
router.post("/participants/auth/signin", signin);
router.get("/participants/landing-page", landingPage);

module.exports = router;
