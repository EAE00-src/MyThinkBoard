import mongoose from "mongoose"


export const connectDB = async () => {
    //the new try-catch in server.js makes former try-catch redundant,
        // as the error can simply bubble up by itself in server.js where the callback occurs
        await mongoose.connect(process.env.MONGODB_URI);
        console.log(`MongoDB successfully connected! ✅`)
    
};