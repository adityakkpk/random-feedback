import dbConnect from "../../../../lib/dbConnect";
import UserModel from "@/model/User";
import bcrypt from "bcryptjs";

import { sendVerificationEmail } from "@/helpers/sendVerificationEmail";
import { sendJSONResponse } from "@/helpers/sendJSONResponse";
import { generateVerifyCode } from "@/helpers/generateVerifyCode";

export async function POST(request: Request) {
  await dbConnect();

  try {
    const { username, email, password } = await request.json();

    const existingUserVerifiedByUsername = await UserModel.findOne({
      username,
      isVerified: true,
    });

    if (existingUserVerifiedByUsername) {
      return sendJSONResponse(false, "Username already taken!", 400);
    }

    const existingUserByEmail = await UserModel.findOne({ email });

    const verifyCode = generateVerifyCode();

    if (existingUserByEmail) {
      if (existingUserByEmail.isVerified) {
        return sendJSONResponse(
          false,
          "Email already registered. Please login or use a different email.",
          400
        );
      } else {
        const hashedPassword = await bcrypt.hash(password, 10);
        existingUserByEmail.password = hashedPassword;
        existingUserByEmail.verifyCode = generateVerifyCode();
        existingUserByEmail.verifyCodeExpiry = new Date(Date.now() + 3600000); // 1 hour expiry

        await existingUserByEmail.save();
        return sendJSONResponse(
          true,
          "Updated the User, already exists with this email. Please verify your email.",
          200
        );
      }
    } else {
      const expiryDate = new Date();
      expiryDate.setHours(expiryDate.getHours() + 1);
      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = new UserModel({
        username,
        email,
        password: hashedPassword,
        isVerified: false,
        verifyCode,
        verifyCodeExpiry: expiryDate,
        isAcceptingMessage: true,
        messages: [],
      });
      await newUser.save();
    }

    // Send Verification email
    const emailResponse = await sendVerificationEmail(
      email,
      username,
      verifyCode
    );

    if (!emailResponse.success) {
      return sendJSONResponse(false, emailResponse.message, 500);
    }

    return sendJSONResponse(
      true,
      "User registered successfully. Please verify your email",
      201
    );
  } catch (error: any) {
    console.error("Error registering user", error);
    return sendJSONResponse(false, "Error registering user", 500);
  }
}
