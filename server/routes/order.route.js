const express = require("express");
const router = express.Router();

const auth = require("../middlewares/auth.middleware.js");
const {
  CashOnDeliveryOrderController,
  getOrderDetailsController,
  paymentController,
  webhookStripe,
} = require("../controllers/order.controller.js");

router.post("/cash-on-delivery", auth, CashOnDeliveryOrderController);
router.post("/checkout", auth, paymentController);
router.post("/webhook", webhookStripe);
router.get("/order-list", auth, getOrderDetailsController);

module.exports = router;
