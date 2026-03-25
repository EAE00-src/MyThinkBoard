import dotenv from "dotenv"
dotenv.config();

import express from "express";
import cors from "cors"

import notesRoutes from './routes/noteRoutes.js'
import { connectDB } from "./config/db.js";

const app = express();
//port# for access and hardcoded "5001" as fallback
const port = process.env.PORT || 5001;
//Database connection 
connectDB();
//Middlware
    //JSON parser middleware
    app.use(express.json());
    //Cross Origin Resource Sharing
    app.use(cors());
    //Routes: webapp will utilize the API routes found within routes.js
    app.use("/api/notes", notesRoutes);

//server opens at localhost port address of 5001 or your choice
app.listen(port, () => {
    console.log(`Server running successfully ✅, running on localhost PORT: ${port}`)
})