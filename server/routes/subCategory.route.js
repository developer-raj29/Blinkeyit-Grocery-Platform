const express = require("express");
const router = express.Router();

const auth = require("../middlewares/auth.middleware.js");
const admin = require("../middlewares/admin.middleware.js");
const {
  AddSubCategoryController,
  deleteSubCategoryController,
  getSubCategoryController,
  updateSubCategoryController,
} = require("../controllers/subCategory.controller.js");


// Public / User Access Routes
router.get("/get", getSubCategoryController);

router.use(auth);

// Admin Access Routes
router.post("/create", admin, AddSubCategoryController);
router.put("/update", admin, updateSubCategoryController);
router.delete("/delete", admin, deleteSubCategoryController);

module.exports = router;
