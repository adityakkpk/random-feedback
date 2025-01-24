import dbConnect from "../../../../lib/dbConnect";
import UserModel from "@/model/User";
import { z } from "zod";
import { usernameValidation } from "@/schemas/signUpSchema";

const UsernameQuerySchema = z.object({
  username: usernameValidation,
});

export async function GET(request: Request) {
  await dbConnect();

  try {
    const { searchParams } = new URL(request.url);
    const queryParam = {
      username: searchParams.get("username"),
    };

    const result = UsernameQuerySchema.safeParse(queryParam);
    console.log(result);

    if (!result.success) {
      const usernameErrors = result.error.format().username?._errors || [];
      return Response.json(
        {
          success: false,
          message: usernameErrors?.length > 0
            ? usernameErrors.join(", ")
            : "Invalid username",
        },
        { status: 400 }
      );
    }

    // Result has an data object in which the username is present
    const {username} = result.data;

    const existingVerifiedUser = await UserModel.findOne({
      username,
      isVerified: true,
    });

    if (existingVerifiedUser) {
      return Response.json(
        {
          success: false,
          message: "Username already taken!",
        },
        { status: 405 }
      );
    }

    return Response.json(
      {
        success: true,
        message: "Username available!",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error Checking unique Username", error);

    return Response.json(
      {
        success: false,
        message: "Error Checking unique Username",
      },
      { status: 500 }
    );
  }
}
