const express = require("express");
const router = express.Router();

const auth = require("../middlewares/auth.middleware.js");
const {
  AddSubCategoryController,
  deleteSubCategoryController,
  getSubCategoryController,
  updateSubCategoryController,
} = require("../controllers/subCategory.controller.js");

router.post("/create", auth, AddSubCategoryController);
router.post("/get", getSubCategoryController);
router.put("/update", auth, updateSubCategoryController);
router.delete("/delete", auth, deleteSubCategoryController);

module.exports = router;
