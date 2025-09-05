const mongoose = require("mongoose");

const subCategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Subcategory name is required"],
      trim: true,
    },
    image: {
      type: String,
      default: "",
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: [true, "Parent category is required"],
    },
  },
  { timestamps: true }
);

// Compound index for uniqueness per category
subCategorySchema.index({ name: 1, category: 1 }, { unique: true });

const SubCategory = mongoose.model("SubCategory", subCategorySchema);
module.exports = SubCategory;
