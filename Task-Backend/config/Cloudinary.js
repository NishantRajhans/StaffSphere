import dotenv from "dotenv";
import { v2 as cloudinary } from "cloudinary";
dotenv.config();
const cloudinaryConnect = () => {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
};
const uploadImageToCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });
    return response;
  } catch (err) {
    console.error("Error uploading to Cloudinary:", err);
    return null;
  }
};
export { cloudinaryConnect, uploadImageToCloudinary };