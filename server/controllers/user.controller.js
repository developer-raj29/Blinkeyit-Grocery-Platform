const UserModel = require("../models/user.model.js");
const bcryptjs = require("bcryptjs");
const uploadImageCloudinary = require("../utils/uploadImageCloudinary.js");

/**
 * @description Upload Avatar
 * @route [Route]
 */
const uploadAvatar = async (request, response) => {
  try {
    const userId = request.userId; // auth middlware
    const image = request.file; // multer middleware

    const upload = await uploadImageCloudinary(image);

    await UserModel.findByIdAndUpdate(userId, {
      avatar: upload.url,
    });

    return response.json({
      error: false,
      success: true,
      message: "upload profile",
      data: {
        _id: userId,
        avatar: upload.url,
      },
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
 * @description Update User Details
 * @route PUT /api/user/update-user
 */
const updateUserDetails = async (request, response) => {
  try {
    const userId = request.userId; //auth middleware
    const { name, email, mobile, password } = request.body;

    let hashPassword = "";

    if (password) {
      const salt = await bcryptjs.genSalt(10);
      hashPassword = await bcryptjs.hash(password, salt);
    }

    const updateUser = await UserModel.updateOne(
      { _id: userId },
      {
        ...(name && { name: name }),
        ...(email && { email: email }),
        ...(mobile && { mobile: mobile }),
        ...(password && { password: hashPassword }),
      }
    );

    return response.json({
      success: true,
      error: false,
      message: "Updated successfully",
      data: updateUser,
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
 * @description User Details
 * @route GET /api/user/user-details
 */
const userDetails = async (request, response) => {
  try {
    const userId = request.userId;

    console.log(userId);

    const user = await UserModel.findById(userId).select(
      "-password -refresh_token"
    );

    return response.json({
      success: true,
      error: false,
      message: "user details",
      data: user,
    });
  } catch (_error) {
    return response.status(500).json({
      success: false,
      error: true,
      message: "Something is wrong",
    });
  }
};

module.exports = {
  uploadAvatar,
  updateUserDetails,
  userDetails,
};


