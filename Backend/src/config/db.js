import mongoose from "mongoose"


export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log(`MongoDB successfully connected! ✅`)
    } catch (error) {
        console.error(`Error: ${error.message} ❌`)
        process.exit(1) //exit(1) means to exit with failure
    }
};