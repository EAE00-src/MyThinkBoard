import dotenv from "dotenv"
dotenv.config();

import express from "express";
import cors from "cors"

import notesRoutes from './routes/noteRoutes.js'
import { connectDB } from "./config/db.js";
import rateLimiter from "./middleware/rateLimiter.js";

const app = express();

//Trust the first proxy (Render's load balancer) so req.ip (upstash redis ratelimiter's identifier) 
    // returns the real client IP to avoid ratelimiting every instance globally and instead ratelimiting individually
    app.set('trust proxy', 1);
//port# for access, hardcoded "5001" as fallback
const port = process.env.PORT || 5001;

//Middleware
    //Cross Origin Resource Sharing
    app.use(cors());
    //JSON parser: makes json bodies accessible
    app.use(express.json());
    //RateLimiter: prevents potential spam from bots and potential users
    app.use(rateLimiter);
    

//Routes: webapp will utilize the API routes found within routes.js
app.use("/api/notes", notesRoutes);


try {
    //Database connection 
    await connectDB(); //top-level await

    //After a successful database connection, run the server
    app.listen(port, () => {
        console.log(`Server running successfully ✅, running on localhost PORT: ${port}`)
    })
} catch (error) {
    //If connection fails, throw the error and exit the process with failure
    console.error(`Database connection failed. Server not started. ❌ ${error}`);
    process.exit(1);
}