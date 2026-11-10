const express = require("express");
const protect = require("../Middleware/authMiddleware");

const {
  createOrder,
  verifyPayment,
} = require("../Controllers/paymentController");

const router = express.Router();

router.use(protect);

router.post("/create-order", createOrder);
router.post("/verify-payment", verifyPayment);

module.exports = router;
