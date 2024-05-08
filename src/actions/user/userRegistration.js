"use server";

import connectDB from "@/db/db";
import User from "@/models/user.model";
import { uploadImageIntoCloud } from "@/utils/uploadImage";

export async function userRegistration(formData) {
  try {
    connectDB();

    const fname = formData.get("fname");
    const lname = formData.get("lname");
    const mobile = formData.get("mobile");
    const email = formData.get("email");
    const dob = formData.get("dob");
    const gender = formData.get("gender");

    const address = formData.get("address");
    const city = formData.get("city");
    const state = formData.get("state");
    const pincode = formData.get("pincode");
    const user_image = formData.get("user_image");

    const randomNum = Math.floor(Math.random() * 9000000000000000) + 1000000000000000;

    const userExist = await User.findOne({ $or: [{ mobile }, { uid: randomNum }] });

    if (userExist) {
      return {
        success: false,
        message: "User already registered !!",
        statusCode: 500
      };
    }

    if (user_image && !userExist) {
      const uploadImageUrl = await uploadImageIntoCloud(user_image);

      const newUser = await User({ fname, lname, mobile, email, dob, gender, address, city, state, pincode, uid: randomNum, user_image: uploadImageUrl });

      const result = await newUser.save();

      if (result) {
        return {
          success: true,
          message: "Registration Successful",
          statusCode: 200,
          data: result.uid
        }
      }
      else {
        return {
          success: false,
          message: "Something went wrong on registration",
          statusCode: 500
        }
      }
    }

  } catch (error) {
    return {
      success: false,
      message: "Internal Server Error",
      statusCode: 500,
      error: error.message
    };
  }
}