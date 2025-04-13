import { v2 as cloudinary } from "cloudinary";

// ✅ Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET_KEY,
});

// ✅ Upload utility function
const uploadImageToCloudinary = async (image) => {
  try {
    const buffer = image?.buffer || Buffer.from(await image.arrayBuffer());

    const uploadedImage = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream({ folder: "binkeyit" }, (error, result) => {
          if (error) return reject(error);
          resolve(result);
        })
        .end(buffer);
    });

    return uploadedImage;
  } catch (error) {
    console.error("Cloudinary upload error:", error);
    throw new Error("Failed to upload image to Cloudinary");
  }
};

module.exports = uploadImageToCloudinary;
