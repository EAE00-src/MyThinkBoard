import Note from "../models/Note.js";

//controller to get all existing notes
        //adding an "_" in place of req parameter/argument skips the check for said value, assuming it isn't needed
export const getAllNotes = async (_, res) => {

    try {
        //GET all notes and sort by the most recent creation 
        const notes = await Note.find().sort({createdAt: -1}) //-1 will sort in desc. order (newest to oldest)
        res.status(200).json(notes)
    } catch (error) {
        console.error(`Error in getAllNotes controller: ${error}`)
        res.status(500).json({message: "Internal server error"})
    }

};
//controller to get a specific Note
export const getNote = async (req, res) => {

    try {
        const noteById = await Note.findById(req.params.id)
        if(!noteById) return res.status(404).json({message: "Note is missing or doesn't exist. ❌"})
        res.status(200).json(noteById)
    } catch (error) {
        console.error(`Error in getNote controller: ${error}`)
        res.status(500).json({message: "Internal server error"})
    }

}
//controller to create a new note
export const createNote = async (req, res) => {
    try {
        //destructured title and content objects for immediate reference/readability
        const {title, content} = req.body
        //New instance of a note being created
        const newNote = new Note({title, content})
        //send/save new Note
        await newNote.save()
        //upon success, confirm that the Note was created
        res.status(201).json({message: 'New note created successfully! ✅'})
    } catch (error) {
        console.error(`Error in createNote controller: ${error}`)
        res.status(500).json({message: "Internal server error"})
    }
};
//controller to update a note
export const updateNote = async (req, res) => {

  try {
    const {title, content} = req.body;
    //locate the Note before passing the title and content 
    const updatedNote = await Note.findByIdAndUpdate(
        req.params.id, 
        {title, content},
        {
            returnDocument: 'after',
            runValidators: true
        }
    )
    //if the note doesn't exist, return not found status
    if(!updatedNote) return res.status(404).json({message: "Note not found ❌"})
    res.status(200).json({message: "Note updated successfully! ✅", data: updatedNote})
  } catch (error) {
        console.error(`Error in updateNote controller: ${error}`)
        res.status(500).json({message: "Internal server error"})
    } 

};
//controller to DELETE a note
export const deleteNote = async (req, res) => {

    try {
        
        const deleteRequest = await Note.findByIdAndDelete(req.params.id);
        //if the Note doesn't exist respond with a 404 error
        if(!deleteRequest) return res.status(404).json({message: "Note not found, can't delete! ❌"})
        res.status(204).json({message: "Note successfully deleted! ✅"})
    } catch (error) {
        console.error(`Error in deleteNote controller: ${error}`)
        res.status(500).json({message: "Internal server error"})
    }

};