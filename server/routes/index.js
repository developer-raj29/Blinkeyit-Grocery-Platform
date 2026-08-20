const express = require("express");
const router = express.Router();

const authRouter = require("./auth.route");
const userRouter = require("./user.route");
const categoryRouter = require("./category.route");
const uploadRouter = require("./upload.route");
const subCategoryRouter = require("./subCategory.route");
const productRouter = require("./product.route");
const cartRouter = require("./cart.route");
const addressRouter = require("./address.route");
const orderRouter = require("./order.route");

router.use("/auth", authRouter);
router.use("/user", userRouter);
router.use("/category", categoryRouter);
router.use("/file", uploadRouter);
router.use("/subcategory", subCategoryRouter);
router.use("/product", productRouter);
router.use("/cart", cartRouter);
router.use("/address", addressRouter);
router.use("/order", orderRouter);

module.exports = router;
