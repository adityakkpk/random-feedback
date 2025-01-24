import UserModel from "@/model/User";
import dbConnect from "../../../../lib/dbConnect";

export async function POST(request: Request) {
  await dbConnect();

  try {
    const { username, code } = await request.json();
    const decodedUsername = decodeURIComponent(username);

    const user = await UserModel.findOne({ username: decodedUsername });

    if (!user) {
      return Response.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    const isCodeValid = user.verifyCode === code;
    const isCodeNotExpired = new Date(user.verifyCodeExpiry) > new Date();

    if (isCodeValid && isCodeNotExpired) {
      user.isVerified = true;
      await user.save();
      return Response.json(
        { success: true, message: "User verified successfully" },
        { status: 200 }
      );
    } else if (!isCodeNotExpired) {
      return Response.json(
        { success: false, message: "Verification code has expired" },
        { status: 403 }
      );
    } else {
      return Response.json(
        { success: false, message: "Invalid verification code" },
        { status: 401 }
      );
    }
  } catch (error) {
    console.error("Error Verifying code", error);

    return Response.json(
      {
        success: false,
        message: "Error Verifying code",
      },
      { status: 500 }
    );
  }
}
