const SubCategoryModel = require("../models/subCategory.model");
const { redisClient } = require("../config/redis.js");

/**
 * @description Add Sub Category
 * @route POST /api/subCategory/create
 */
const AddSubCategoryController = async (request, response) => {
  try {
    const { name, image, category } = request.body;

    if (!name || !image || !category) {
      return response.status(400).json({
        success: false,
        error: true,
        message: "Provide name, image, and category ID",
      });
    }

    // If category is sent as an array, extract _id
    // const categoryId = Array.isArray(category)
    //   ? category[0]?._id || category[0]
    //   : category;

    const payload = {
      name,
      image,
      category,
    };

    const createSubCategory = new SubCategoryModel(payload);
    const save = await createSubCategory.save();

    // Cache Invalidation
    if (redisClient.isReady) {
      await redisClient.del("subCategories:all");
    }

    return response.json({
      success: true,
      error: false,
      message: "Sub Category Created",
      data: save,
    });
  } catch (error) {
    return response.status(500).json({
      success: false,
      error: true,
      message: error.message || error,
    });
  }
};

 /**
 * @description Get Sub Category
 * @route GET /api/subCategory/get
 */

 const getSubCategoryController = async (request, res) => {
  try {
    const cachedData = redisClient.isReady ? await redisClient.get("subCategories:all") : null;
    if (cachedData) {
      console.log("[CACHE HIT] SubCategories");
      return res.status(200).json({
        success: true,
        error: false,
        caching: true,
        message: "Sorted Sub Category Data",
        data: JSON.parse(cachedData),
      });
    }

    console.log("[CACHE MISS] SubCategories");
    const data = await SubCategoryModel.aggregate([
      // Step 1: Lookup from the categories collection
      {
        $match: {},
      },
      {
        $lookup: {
          from: "categories",
          localField: "category",
          foreignField: "_id",
          as: "category",
        },
      },
      // Step 2: Unwind the category array (since lookup returns an array)
      {
        $unwind: "$category",
      },
      // Step 3: Sort by category.name (alphabetical)
      {
        $sort: {
          "category.name": 1,
        },
      },
    ]);

    if (data && data.length > 0) {
      // Cache the result for 1 hour
      if (redisClient.isReady) {
        await redisClient.set("subCategories:all", JSON.stringify(data), {
          EX: 3600,
        });
      }
    }

    return res.status(200).json({
      success: true,
      error: false,
      caching: false,
      message: "Sorted Sub Category Data",
      data: data,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: true,
      message: error.message || error,
    });
  }
};

/**
 * @description Update Sub Category
 * @route PUT /api/subCategory/update
 */
const updateSubCategoryController = async (request, response) => {
  try {
    const { _id, name, image, category } = request.body;

    const checkSub = await SubCategoryModel.findById(_id);

    if (!checkSub) {
      return response.status(400).json({
        success: false,
        error: true,
        message: "Check your _id",
      });
    }

    const updateSubCategory = await SubCategoryModel.findByIdAndUpdate(_id, {
      name,
      image,
      category,
    });

    // Cache Invalidation
    if (redisClient.isReady) {
      await redisClient.del("subCategories:all");
    }

    return response.json({
      success: true,
      error: false,
      message: "Updated Successfully",
      data: updateSubCategory,
    });
  } catch (error) {
    return response.status(500).json({
      success: false,
      error: true,
      message: error.message || error,
    });
  }
};

/**
 * @description Delete Sub Category
 * @route DELETE /api/subCategory/delete
 */
const deleteSubCategoryController = async (request, response) => {
  try {
    const { _id } = request.body;
    console.log("Id", _id);
    const deleteSub = await SubCategoryModel.findByIdAndDelete(_id);

    // Cache Invalidation
    if (redisClient.isReady) {
      await redisClient.del("subCategories:all");
    }

    return response.json({
      success: true,
      error: false,
      message: "Delete successfully",
      data: deleteSub,
    });
  } catch (error) {
    return response.status(500).json({
      success: false,
      error: true,
      message: error.message || error,
    });
  }
};

module.exports = {
  AddSubCategoryController,
  getSubCategoryController,
  updateSubCategoryController,
  deleteSubCategoryController,
};
