const express = require("express");
const router = express.Router();

const auth = require("../middlewares/auth.middleware.js");
const {
  addToCartItemController,
  deleteCartItemQtyController,
  getCartItemController,
  updateCartItemQtyController,
} = require("../controllers/cart.controller.js");

router.use(auth);

// User Access Routes
router.post("/create", addToCartItemController);
router.get("/get", getCartItemController);
router.put("/update-qty", updateCartItemQtyController);
router.delete("/delete-cart-item", deleteCartItemQtyController);

module.exports = router;
