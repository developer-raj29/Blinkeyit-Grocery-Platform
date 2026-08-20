const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth.middleware.js");
const productController = require("../controllers/product.controller.js");
const admin = require("../middlewares/admin.middleware.js");


// Public / User Access Routes
router.get("/get", productController.getProductController);
router.get("/get-product-by-category", productController.getProductByCategory);

router.get(
  "/get-product-by-category-and-subcategory",
  productController.getProductByCategoryAndSubCategory
);


router.get("/get-product-details", productController.getProductDetails);

//search product
router.get("/search-product", productController.searchProduct);

router.use(auth);

// Admin Access Routes
router.post("/create", admin, productController.createProductController);
//update product
router.patch("/update-product-details", admin, productController.updateProductDetails);

//delete product
router.delete("/delete-product", admin, productController.deleteProductDetails );

module.exports = router;
