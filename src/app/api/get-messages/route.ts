import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import { User } from "next-auth";

export async function GET() {
  await dbConnect();

  const session = await getServerSession(authOptions);
  const _user: User = session?.user as User;

  if (!session || !session.user) {
    return Response.json(
      {
        success: false,
        message: "Not Authenticated",
      },
      { status: 401 }
    );
  }

  try {
    // First, find the user to ensure they exist
    const user = await UserModel.findById(_user._id);
    
    if (!user) {
      return Response.json(
        {
          success: false,
          message: "User not found",
        },
        { status: 404 }
      );
    }

    // If user exists but has no messages, return empty array
    if (!user.messages || user.messages.length === 0) {
      return Response.json(
        {
          success: true,
          messages: [],
        },
        { status: 200 }
      );
    }

    // Sort messages by createdAt in descending order
    const sortedMessages = user.messages.sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

    return Response.json(
      {
        success: true,
        messages: sortedMessages,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log("Error in getting Messages", error);
    return Response.json(
      {
        success: false,
        message: "Error in getting Messages",
      },
      { status: 500 }
    );
  }
}
