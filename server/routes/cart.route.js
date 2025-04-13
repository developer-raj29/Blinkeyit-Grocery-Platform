const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth.js");
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

export default router;
