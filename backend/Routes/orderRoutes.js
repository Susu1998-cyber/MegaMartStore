const express = require("express");

const protect = require("../Middleware/authMiddleware");

const { createOrder } = require("../Controllers/orderController");

const router = express.Router();
    
router.use(protect);

router.post("/", createOrder);

module.exports = router;
