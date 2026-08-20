const express = require("express");
const router = express.Router();

const auth = require("../middlewares/auth.middleware.js");
const admin = require("../middlewares/admin.middleware.js");
const {
  CashOnDeliveryOrderController,
  getOrderDetailsController,
  paymentController,
  webhookStripe,
  getAllOrdersController,
  updateOrderStatusController,
} = require("../controllers/order.controller.js");

// Public Routes (Stripe needs access without a token)
router.post("/webhook", express.raw({ type: 'application/json' }), webhookStripe);

router.use(auth);

// User Access Routes
router.post("/cash-on-delivery", CashOnDeliveryOrderController);
router.post("/checkout", paymentController);
router.get("/order-list", getOrderDetailsController);

// Admin Access Routes
router.get("/admin/all-orders", admin, getAllOrdersController);
router.patch("/admin/update-status", admin, updateOrderStatusController);

module.exports = router;
