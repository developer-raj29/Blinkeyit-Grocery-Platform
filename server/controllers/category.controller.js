const CategoryModel = require("../models/category.model");
const { redisClient } = require("../config/redis.js");
const SubCategoryModel = require("../models/subCategory.model");
const ProductModel = require("../models/product.model");

/**
 * @description Add Category
 * @route POST /api/category/add-category
 */
const AddCategoryController = async (request, response) => {
  try {
    const { name, image } = request.body;

    if (!name || !image) {
      return response.status(400).json({
        message: "Enter required fields",
        error: true,
        success: false,
      });
    }

    const addCategory = new CategoryModel({
      name,
      image,
    });

    const saveCategory = await addCategory.save();

    if (!saveCategory) {
      return response.status(500).json({
        message: "Not Created",
        error: true,
        success: false,
      });
    }

    // Cache Invalidation
    if (redisClient.isReady) {
      await redisClient.del("categories:all");
      await redisClient.del("subCategories:all");
    }

    return response.status(201).json({
      message: "Add Category successfully",
      data: saveCategory,
      success: true,
      error: false,
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

/**
 * @description Get Category
 * @route GET /api/category/get
 */
const getCategoryController = async (request, response) => {
  try {
    const cachedData = redisClient.isReady ? await redisClient.get("categories:all") : null;
    if (cachedData) {
      console.log("[CACHE HIT] Categories");
      return response.json({
        caching: true,
        data: JSON.parse(cachedData),
        error: false,
        success: true,
      });
    }

    console.log("[CACHE MISS] Categories");
    const data = await CategoryModel.find().sort({ createdAt: -1 }).lean();

    if (data && data.length > 0) {
      // Cache the result for 1 hour
      if (redisClient.isReady) {
        await redisClient.set("categories:all", JSON.stringify(data), {
          EX: 3600,
        });
      }
    }

    return response.json({
      caching: false,
      data: data,
      error: false,
      success: true,
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

/**
 * @description Update Category
 * @route PUT /api/category/update
 */
const updateCategoryController = async (request, response) => {
  try {
    const { _id, name, image } = request.body;

    const update = await CategoryModel.updateOne(
      {
        _id: _id,
      },
      {
        name,
        image,
      }
    );

    // Cache Invalidation
    if (redisClient.isReady) {
      await redisClient.del("categories:all");
      await redisClient.del("subCategories:all");
    }

    return response.json({
      message: "Updated Category",
      success: true,
      error: false,
      data: update,
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

/**
 * @description Delete Category
 * @route DELETE /api/category/delete
 */
const deleteCategoryController = async (request, response) => {
  try {
    const { _id } = request.body;

    const checkSubCategory = await SubCategoryModel.find({
      category: {
        $in: [_id],
      },
    }).countDocuments();

    const checkProduct = await ProductModel.find({
      category: {
        $in: [_id],
      },
    }).countDocuments();

    if (checkSubCategory > 0 || checkProduct > 0) {
      return response.status(400).json({
        message: "Category is already use can't delete",
        error: true,
        success: false,
      });
    }

    const deleteCategory = await CategoryModel.deleteOne({ _id: _id });

    // Cache Invalidation
    if (redisClient.isReady) {
      await redisClient.del("categories:all");
      await redisClient.del("subCategories:all");
    }

    return response.json({
      message: "Delete category successfully",
      data: deleteCategory,
      error: false,
      success: true,
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      success: false,
      error: true,
    });
  }
};

module.exports = {
  AddCategoryController,
  getCategoryController,
  updateCategoryController,
  deleteCategoryController,
};
