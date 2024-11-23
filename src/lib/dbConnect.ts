// In NextJS, the server is not running every time it runs on demand. So we have to take care of the things like if we are already connected to the database or not.

import mongoose from "mongoose";

type ConnectionObject = {
  isConnected?: number;
};

// Connect to MongoDB
const connection: ConnectionObject = {};

async function dbConnect(): Promise<void> {
  if (connection.isConnected) {
    console.log("Already connected to DB");
    return;
  }

  try {
    const db = await mongoose.connect(process.env.MONGODB_URI || "", {});
    
    connection.isConnected = db.connections[0].readyState;

    console.log("Connected to MongoDB");
  } catch (error) {
    console.log("Database connection error", error);

    process.exit(1);
  }
}

export default dbConnect;
