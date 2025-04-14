const SubCategoryModel = require("../models/subCategory.model");

// const AddSubCategoryController = async (request, response) => {
//   try {
//     const { name, image, category } = request.body;

//     if (!name && !image && !category[0]) {
//       return response.status(400).json({
//         message: "Provide name, image, category",
//         error: true,
//         success: false,
//       });
//     }

//     const payload = {
//       name,
//       image,
//       category,
//     };

//     const createSubCategory = new SubCategoryModel(payload);
//     const save = await createSubCategory.save();

//     return response.json({
//       message: "Sub Category Created",
//       data: save,
//       error: false,
//       success: true,
//     });
//   } catch (error) {
//     return response.status(500).json({
//       message: error.message || error,
//       error: true,
//       success: false,
//     });
//   }
// };

const AddSubCategoryController = async (request, response) => {
  try {
    const { name, image, category } = request.body;

    if (!name || !image || !category) {
      return response.status(400).json({
        message: "Provide name, image, and category ID",
        error: true,
        success: false,
      });
    }

    // If category is sent as an array, extract _id
    const categoryId = Array.isArray(category)
      ? category[0]?._id || category[0]
      : category;

    const payload = {
      name,
      image,
      category: categoryId,
    };

    const createSubCategory = new SubCategoryModel(payload);
    const save = await createSubCategory.save();

    return response.json({
      message: "Sub Category Created",
      data: save,
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

const getSubCategoryController = async (request, response) => {
  try {
    const data = await SubCategoryModel.find()
      .sort({ createdAt: -1 })
      .populate("category");
    return response.json({
      message: "Sub Category data",
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

const updateSubCategoryController = async (request, response) => {
  try {
    const { _id, name, image, category } = request.body;

    const checkSub = await SubCategoryModel.findById(_id);

    if (!checkSub) {
      return response.status(400).json({
        message: "Check your _id",
        error: true,
        success: false,
      });
    }

    const updateSubCategory = await SubCategoryModel.findByIdAndUpdate(_id, {
      name,
      image,
      category,
    });

    return response.json({
      message: "Updated Successfully",
      data: updateSubCategory,
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

const deleteSubCategoryController = async (request, response) => {
  try {
    const { _id } = request.body;
    console.log("Id", _id);
    const deleteSub = await SubCategoryModel.findByIdAndDelete(_id);

    return response.json({
      message: "Delete successfully",
      data: deleteSub,
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

module.exports = {
  AddSubCategoryController,
  getSubCategoryController,
  updateSubCategoryController,
  deleteSubCategoryController,
};
