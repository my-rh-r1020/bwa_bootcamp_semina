const router = require("express").Router(),
  { signup, signin, landingPage, detailPage, checkoutPage, dashboardPage } = require("./controller"),
  { authenticateUser } = require("../../../middlewares/auth");

router.post("/participants/auth/signup", signup);
router.post("/participants/auth/signin", signin);
router.get("/participants/landing-page", landingPage);
router.get("/participants/detail-page/:id", detailPage);
router.post("/participants/checkout", authenticateUser, checkoutPage);
router.get("/participants/dashboard", authenticateUser, dashboardPage);

module.exports = router;
