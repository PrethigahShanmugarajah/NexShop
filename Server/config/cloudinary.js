// Server/config/cloudinary.js
import { v2 as cloudinary } from "cloudinary";

const connectCloudinary = async () => {
  cloudinary.config({
    cloud_name: process.env.CLOUDUNARY_NAME,
    api_key: process.env.CLOUDUNARY_API_KEY,
    api_secret: process.env.CLOUDUNARY_SECRET_KEY,
  });
};

export default connectCloudinary;
