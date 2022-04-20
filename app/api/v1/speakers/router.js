const router = require("express").Router(),
  { getAllSpeakers } = require("./controller"),
  { authenticateUser } = require("../../../middlewares/auth");

router.get("/", authenticateUser, getAllSpeakers);
