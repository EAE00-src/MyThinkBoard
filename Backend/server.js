import express from "express";
import notesRoutes from './routes/noteRoutes.js'

const app = express();
//The webapp will utilize the API routes found within routes.js
app.use("/api/notes", notesRoutes);
const port = 5001;
//server opens at localhost port address of 5001
app.listen(port, () => {
    console.log(`Server running successfully, running on localhost PORT: ${port}`)
})