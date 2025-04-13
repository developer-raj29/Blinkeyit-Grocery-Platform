const express = require("express");
const router = express.Router();

const auth = require("../middlewares/auth.js");
const {
  createProductController,
  deleteProductDetails,
  getProductByCategory,
  getProductByCategoryAndSubCategory,
  getProductController,
  getProductDetails,
  searchProduct,
  updateProductDetails,
} = require("../controllers/product.controller.js");
const { admin } = require("../middlewares/Admin.js");

router.post("/create", auth, admin, createProductController);
router.post("/get", getProductController);
router.post("/get-product-by-category", getProductByCategory);
router.post(
  "/get-pruduct-by-category-and-subcategory",
  getProductByCategoryAndSubCategory
);
router.post("/get-product-details", getProductDetails);

//update product
router.put("/update-product-details", auth, admin, updateProductDetails);

//delete product
router.delete("/delete-product", auth, admin, deleteProductDetails);

//search product
router.post("/search-product", searchProduct);

export default router;
