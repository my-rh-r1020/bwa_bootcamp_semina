const router = require("express").Router(),
  { getAllCategory, createCategory } = require("./controller"),
  { authenticateUser } = require("../../../middlewares/auth");

router.get("/", authenticateUser, getAllCategory);
router.post("/", authenticateUser, createCategory);

module.exports = router;
