import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const DB = process.env.DATABASE;

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(DB);
    console.log(`Conneted To Mongodb Databse `);
  } catch (error) {
    console.log(`Error in Mongodb ${error}`);
  }
};

export default connectDB;
