const uploadImageCloudinary = require("../utils/uploadImageCloudinary");

const uploadImageController = async (request, response) => {
  try {
    const file = request.file;

    const uploadImage = await uploadImageCloudinary(file);

    return response.json({
      message: "Upload Successfully",
      data: uploadImage,
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
