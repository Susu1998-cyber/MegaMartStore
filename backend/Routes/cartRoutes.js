const express = require("express");

const protect = require("../Middleware/authMiddleware");

const {
  getCart,
  addToCart,
  updateCartItem,
  removeCartItem,
} = require("../Controllers/cartController");

const router = express.Router();

router.use(protect);

router.get("/", getCart);
router.post("/items", addToCart);
router.patch("/items/:id", updateCartItem);
router.delete("/items/:id", removeCartItem);

module.exports = router;