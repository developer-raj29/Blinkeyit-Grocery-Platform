const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth.middleware.js");
const admin = require("../middlewares/admin.middleware.js");

const {
  AddCategoryController,
  deleteCategoryController,
  getCategoryController,
  updateCategoryController,
} = require("../controllers/category.controller.js");


// Public / User Access Routes
router.get("/get", getCategoryController);

router.use(auth);

// Admin Access Routes
router.post("/add-category", admin, AddCategoryController);
router.put("/update", admin, updateCategoryController);
router.delete("/delete", admin, deleteCategoryController);

module.exports = router;
