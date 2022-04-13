const router = require("express").Router(),
  { getAllCategory, createCategory, getOneCategory } = require("./controller"),
  { authenticateUser } = require("../../../middlewares/auth");

router.get("/", authenticateUser, getAllCategory);
router.get("/:id", authenticateUser, getOneCategory);
router.post("/", authenticateUser, createCategory);

module.exports = router;
