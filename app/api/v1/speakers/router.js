const router = require("express").Router(),
  { getAllSpeakers, getOneSpeaker, createSpeaker, updateSpeaker, deleteSpeaker } = require("./controller"),
  { authenticateUser } = require("../../../middlewares/auth"),
  upload = require("../../../middlewares/multer_avatar");

router.get("/", authenticateUser, getAllSpeakers);
router.get("/:id", authenticateUser, getOneSpeaker);
router.post("/", authenticateUser, upload.single("avatar"), createSpeaker);
router.put("/:id", authenticateUser, upload.single("avatar"), updateSpeaker);
router.delete("/:id", authenticateUser, upload.single("avatar"), deleteSpeaker);

module.exports = router;
