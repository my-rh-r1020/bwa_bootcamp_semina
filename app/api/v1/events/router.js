const router = require("express").Router(),
  { getAllEvents, getOneEvent, createEvent, updateEvent, deleteEvent } = require("./controller"),
  { authenticateUser } = require("../../../middlewares/auth"),
  upload = require("../../../middlewares/multer");

router.get("/", authenticateUser, getAllEvents);
router.get("/:id", authenticateUser, getOneEvent);
router.post("/", authenticateUser, upload.single("cover"), createEvent);
router.put("/:id", authenticateUser, upload.single("cover"), updateEvent);
router.delete("/:id", authenticateUser, deleteEvent);

module.exports = router;
