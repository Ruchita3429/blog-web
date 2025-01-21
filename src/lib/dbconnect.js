import mongoose from "mongoose";

const connectToDatabase = async () => {
  try {
    if (!process.env.MONGO_URL) {
      throw new Error("MONGO_URL is not defined in environment variables");
    }

    if (mongoose.connection.readyState === 1) {
      return; // Already connected
    }

    // MongoDB connection without deprecated options
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Connected to database successfully!");
  } catch (error) {
    console.error("Database connection failed:", error);
    throw error; // Throw the original error for better debugging
  }
};

export default connectToDatabase;
