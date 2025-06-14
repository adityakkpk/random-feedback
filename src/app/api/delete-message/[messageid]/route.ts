import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/options";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import { User } from "next-auth";
export async function DELETE(request: Request) {
  const messageId = request.url.split('/').pop();

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

  try {
    const updatedResult = await UserModel.updateOne(
      { _id: user._id },
      { $pull: { messages: { _id: messageId } } }
    );

    if (updatedResult.modifiedCount === 0) {
      return Response.json(
        {
          success: false,
          message: "Message Not Found or already deleted",
        },
        { status: 401 }
      );
    }

    return Response.json(
      {
        success: true,
        message: "Message deleted",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error in delete message route", error);
    return Response.json(
      {
        success: false,
        message: "Error Deleting Message",
      },
      { status: 500 }
    );
  }
}
