const express = require("express");
const router = express.Router();

const auth = require("../middlewares/auth.middleware.js");
// const {
//   createProductController,
//   deleteProductDetails,
//   getProductByCategory,
//   getProductByCategoryAndSubCategory,
//   getProductController,
//   getProductDetails,
//   searchProduct,
//   updateProductDetails,
// } = require("../controllers/product.controller.js");
const productController = require("../controllers/product.controller.js");
const admin = require("../middlewares/admin.middleware.js");

router.post("/create", auth, admin, productController.createProductController);
router.post("/get", productController.getProductController);
router.post("/get-product-by-category", productController.getProductByCategory);
router.post("/get-product-by-category-and-subcategory", productController.getProductByCategoryAndSubCategory);
router.post("/get-product-details", productController.getProductDetails);

//update product
router.put(
  "/update-product-details",
  auth,
  admin,
  productController.updateProductDetails
);

//delete product
router.delete(
  "/delete-product",
  auth,
  admin,
  productController.deleteProductDetails
);

//search product
router.post("/search-product", productController.searchProduct);

module.exports = router;
