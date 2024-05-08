"use server";

import connectDB from "@/db/db";
import User from "@/models/user.model";

export async function searchUserInfo(values) {
  try {
    connectDB();

    const { mobile, dob } = values;

    if (!mobile && !dob) {
      return {
        success: false,
        message: "Please provide all details",
        statusCode: 500
      };
    }

    const userExist = await User.findOne({ $and: [{ mobile, dob }] });

    if (!userExist) {
      return {
        success: false,
        message: "No Aadhar Card found !!",
        statusCode: 500
      };
    }

    return {
      success: true,
      message: "Aadhar card found",
      statusCode: 200,
      data: userExist.uid
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