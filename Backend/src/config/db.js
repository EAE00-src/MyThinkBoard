import mongoose from "mongoose"
import dotenv from "dotenv"

dotenv.config();

export const connectDB = async () => {
    try {
        const connect = await mongoose.connect(process.env.MONGODB_URI);
        console.log(`MongoDB successfully connected! ✅`)
    } catch (error) {
        console.error(`Error: ${error.message} ❌`)
        process.exit(1) //exit(1) means to exit with failure
    }
};