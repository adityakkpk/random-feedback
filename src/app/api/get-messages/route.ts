import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import { User } from "next-auth";
import mongoose from "mongoose";

export async function GET(request: Request) {
  await dbConnect();

  const session = await getServerSession(authOptions);
  const user: User = session?.user as User;

  if (!session || !session.user) {
    return Response.json(
      {
        success: false,
        message: "Not Authenticated",
      },
      { status: 401 }
    );
  }

  const userId = new mongoose.Types.ObjectId(user._id).toString();

  try {
    const user = await UserModel.aggregate([
      { $match: { _id: userId } },
      { $unwind: "$messages" },
      { $sort: { "messages.createdAt": -1 } },
      { $group: { _id: "$_id", messages: { $push: "$messages" } } },
    ]).exec();

    if(!user || user.length === 0) {
        return Response.json(
            {
              success: false,
              message: "User not found",
            },
            { status: 401 }
          );
    }

    Response.json(
        {
          success: true,
          messages: user[0].messages,
        },
        { status: 200 }
      );
  } catch (error) {
    console.log("Error in getting Messages", error);
    Response.json(
        {
          success: false,
          message: "Error in getting Messages",
        },
        { status: 200 }
      );
  }
}
