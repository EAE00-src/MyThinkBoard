import express from "express";
import { getAllNotes, getNote, createNote, updateNote, deleteNote } from "../controllers/noteController.js";

const router = express.Router();
//get all existing notes
router.get("/", getAllNotes);
//get a specific existing note
router.get("/:id", getNote)
//create a new note
router.post("/", createNote);
//update an existing note
router.put("/:id", updateNote);
//delete an existing note
router.delete("/:id", deleteNote);

export default router;