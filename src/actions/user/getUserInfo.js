"use server";

import connectDB from "@/db/db";
import User from "@/models/user.model";

export async function getUserInfo(uid) {
  try {
    connectDB();

    if (!/^\d{16}$/.test(uid)) {
      return {
        success: false,
        message: "Invalid Uid",
        statusCode: 500
      }
    }

    const userExist = await User.findOne({ uid });

    if (!userExist) {
      return {
        success: false,
        message: "No Aadhar Card found !!",
        statusCode: 500
      };
    }

    return {
      success: true,
      message: "User found",
      statusCode: 200,
      data: JSON.stringify(userExist)
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