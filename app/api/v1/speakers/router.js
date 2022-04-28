const router = require("express").Router(),
  { getAllSpeakers, getOneSpeaker, createSpeaker, updateSpeaker } = require("./controller"),
  { authenticateUser } = require("../../../middlewares/auth"),
  upload = require("../../../middlewares/multer");

router.get("/", authenticateUser, getAllSpeakers);
router.get("/:id", authenticateUser, getOneSpeaker);
router.post("/", authenticateUser, upload.single("avatar"), createSpeaker);
router.put("/:id", authenticateUser, upload.single("avatar"), updateSpeaker);

module.exports = router;
