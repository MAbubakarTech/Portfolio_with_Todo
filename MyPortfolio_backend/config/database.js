import dns from "node:dns";
import mongoose from "mongoose";

const connectDB = async () => {
  const mongoURI = process.env.MONGO_URI;

  if (!mongoURI) {
    throw new Error(
      "MONGO_URI is not set. Add your MongoDB Atlas connection string to the environment.",
    );
  }

  if (mongoURI.startsWith("mongodb+srv://")) {
    dns.setServers(["1.1.1.1", "8.8.8.8"]);
  }

  try {
    await mongoose.connect(mongoURI);
    console.log("Successfully connected to MongoDB Atlas");
  } catch (error) {
    throw new Error(`MongoDB connection error: ${error.message}`);
  }
};

export default connectDB;
