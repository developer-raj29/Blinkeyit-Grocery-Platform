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
router.get("/get", productController.getProductController);
router.get("/get-product-by-category", productController.getProductByCategory);

router.get(
  "/get-product-by-category-and-subcategory",
  productController.getProductByCategoryAndSubCategory
);
router.get("/get-product-details", productController.getProductDetails);

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
