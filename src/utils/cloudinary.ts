// importing all dependencies

import cloudinaryModule from "cloudinary"

const cloudinary = cloudinaryModule.v2;



export default cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});


