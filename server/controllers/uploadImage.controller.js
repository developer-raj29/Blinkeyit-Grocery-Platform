const uploadImageCloudinary = require("../utils/uploadImageCloudinary");

/**
 * @description Upload Image
 * @route [Route]
 */
const uploadImageController = async (request, response) => {
  try {
    const file = request.file;

    const uploadImage = await uploadImageCloudinary(file);

    return response.status(201).json({
      error: false,
      success: true,
      message: "Upload Successfully",
      data: uploadImage,
    });
  } catch (error) {
    return response.status(500).json({
      success: false,
      error: true,
      message: error.message || error,
    });
  }
};

// const uploadImageController = async (req, res) => {
//   try {
//     const files = req.files; // Now it's an array
//     const uploadResults = [];

//     for (const file of files) {
//       const uploaded = await uploadImageCloudinary(file);
//       uploadResults.push(uploaded);
//     }

//     return res.json({
//       message: "All images uploaded successfully",
//       data: uploadResults,
//       success: true,
//       error: false,
//     });
//   } catch (error) {
//     return res.status(500).json({
//       message: error.message || error,
//       error: true,
//       success: false,
//     });
//   }
// };

module.exports = uploadImageController;
