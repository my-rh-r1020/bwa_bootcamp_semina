const router = require("express").Router(),
  { getAllPayments, getOnePayment, createPayment, updatePayment, deletePayment, changeStatusPayment } = require("./controller"),
  { authenticateUser } = require("../../../middlewares/auth"),
  upload = require("../../../middlewares/multer_payment");

router.get("/", authenticateUser, getAllPayments);
router.get("/:id", authenticateUser, getOnePayment);
router.post("/", authenticateUser, upload.single("imageUrl"), createPayment);
router.put("/:id", authenticateUser, upload.single("imageUrl"), updatePayment);
router.put("/:id/status", authenticateUser, changeStatusPayment);
router.delete("/:id", authenticateUser, deletePayment);

module.exports = router;
