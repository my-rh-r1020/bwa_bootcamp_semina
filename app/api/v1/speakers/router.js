const router = require("express").Router(),
  { getAllSpeakers, createSpeaker } = require("./controller"),
  { authenticateUser } = require("../../../middlewares/auth"),
  upload = require("../../../middlewares/multer");

router.get("/", authenticateUser, getAllSpeakers);
router.post("/", authenticateUser, upload.single("avatar"), createSpeaker);

module.exports = router;
