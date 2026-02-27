"use server";
import { Collections } from "../../app/lib/dbConnect";
import { dbConnect } from "../../app/lib/dbConnect";
import bcrypt from "bcryptjs";

export const postuser = async (payload) => {
  const { email, password, name } = payload;

  // Validate payload
  if (!email || !password || !name) {
    return { success: false, message: "Name, email, and password are required" };
  }

  try {
    // Get MongoDB collection
    const collection = await dbConnect(Collections.USER);

    // Check if user already exists
    const isExist = await collection.findOne({ email });
    if (isExist) {
      return { success: false, message: "User already exists" };
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 14);

    // Create new user object
    const newUser = {
      provider: "credentials",
      name,
      email,
      password: hashedPassword,
    };

    // Insert the user
    const result = await collection.insertOne(newUser);

    if (result.acknowledged) {
      return {
        success: true,
        insertedId: result.insertedId.toString(),
        message: "User registered successfully",
      };
    } else {
      return { success: false, message: "Failed to insert user" };
    }
  } catch (error) {
    console.error("Error in postuser:", error);
    return { success: false, message: "Internal server error" };
  }
};