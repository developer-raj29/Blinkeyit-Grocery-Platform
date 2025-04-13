const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth.js");
const {
  AddCategoryController,
  deleteCategoryController,
  getCategoryController,
  updateCategoryController,
} = require("../controllers/category.controller.js");

router.post("/add-category", auth, AddCategoryController);
router.get("/get", getCategoryController);
router.put("/update", auth, updateCategoryController);
router.delete("/delete", auth, deleteCategoryController);

export default router;
