const router = require("express").Router(),
  { getAllEvents, getOneEvent, createEvent } = require("./controller"),
  { authenticateUser } = require("../../../middlewares/auth"),
  upload = require("../../../middlewares/multer");

router.get("/", authenticateUser, getAllEvents);
router.get("/:id", authenticateUser, getOneEvent);
router.post("/", authenticateUser, upload.single("cover"), createEvent);

module.exports = router;
