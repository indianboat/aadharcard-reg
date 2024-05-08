import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import path from "path";
import { pipeline } from "stream";
import { promisify } from "util";
import os from "os";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const pump = promisify(pipeline);


export async function uploadImageIntoCloud(file) {

  try {
    if (!file) {
      throw new Error("Please provide file");
    }

    // filePath = `./public/temp/${file.name}`;
    // const filePath = path.join(process.cwd(), "public/temp", `/${file.name}`); // for local development only
    // for production (vercel) development only

    const tempFolder = os.tmpdir();
    const prodFilePath = path.join(tempFolder, `/${file.name}`);

    await pump(file.stream(), fs.createWriteStream(prodFilePath));

    const uploadUserProfileImage = await cloudinary.uploader.upload(prodFilePath, { resource_type: "image" });

    if (uploadUserProfileImage) {
      fs.unlinkSync(prodFilePath) // remove file from local server if any error on uploading
      return uploadUserProfileImage.secure_url
    }

  } catch (error) {
    console.log(error);
    throw error; // Re-throw the error to propagate it to the caller
  }
}

export async function deleteImageFromCloud(public_id) {

  try {

    const deleteImage = await cloudinary.api.delete_resources(public_id, { resource_type: "image" })

    if (!deleteImage) {
      return { success: false, message: "Error on deleting images from cloudinary" }
    }

    return deleteImage

  } catch (error) {
    console.log(error);
  }
}