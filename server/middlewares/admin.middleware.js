// const UserModel = require("../models/user.model");

// const admin = async (request, response, next) => {
//   try {
//     const userId = request.userId;

//     const user = await UserModel.findById(userId);

//     if (user.role !== "ADMIN") {
//       return response.status(400).json({
//         message: "Permission denial",
//         error: true,
//         success: false,
//       });
//     }

//     next();
//   } catch (error) {
//     return response.status(500).json({
//       message: "Permission denial",
//       error: true,
//       success: false,
//     });
//   }
// };
// module.exports = admin;

const UserModel = require("../models/user.model");

const admin = async (request, response, next) => {
  try {
    const userId = request.userId;

    // Check if userId is present
    if (!userId) {
      return response.status(401).json({
        message: "Unauthorized: No user ID found in request",
        error: true,
        success: false,
      });
    }

    const user = await UserModel.findById(userId);

    // Check if user exists
    if (!user) {
      return response.status(404).json({
        message: "User not found",
        error: true,
        success: false,
      });
    }

    // Check if user is admin
    if (user.role !== "ADMIN") {
      return response.status(403).json({
        message: "Permission denied: Admin access required",
        error: true,
        success: false,
      });
    }

    next();
  } catch (error) {
    return response.status(500).json({
      message: error.message || "Internal Server Error",
      error: true,
      success: false,
    });
  }
};

module.exports = admin;
