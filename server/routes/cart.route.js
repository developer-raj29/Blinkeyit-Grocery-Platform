const express = require("express");
const router = express.Router();

const auth = require("../middlewares/auth.middleware.js");
const {
  addToCartItemController,
  deleteCartItemQtyController,
  getCartItemController,
  updateCartItemQtyController,
} = require("../controllers/cart.controller.js");

router.post("/create", auth, addToCartItemController);
router.get("/get", auth, getCartItemController);
router.put("/update-qty", auth, updateCartItemQtyController);
router.delete("/delete-cart-item", auth, deleteCartItemQtyController);

module.exports = router;
