import { PenSquareIcon, Trash2Icon } from "lucide-react";
import { Link } from "react-router";
import toast from "react-hot-toast";

import { formatDate } from "../../lib/utils.js";
import api from "../../lib/axios.js";

const NoteCard = ({ note, updateNotes }) =>{

    const handleDelete = async (e, id) =>{
        e.preventDefault(); //prevents Link navigation when clicking the delete/trash icon

        if(!window.confirm("Are you sure you want to delete this note?")) return
        try {
            await api.delete(`/notes/${id}`)
            updateNotes((prev) => prev.filter(note => note._id !== id)) //remove deleted note from note state array
            toast.success("Note deleted successfully!", {
                icon:"✅",
                duration: 3000
            })
            
        } catch (error) {
            console.error("Note could not be deleted.", error)
            toast.error("Failed to delete note!", {
                icon: "❌",
                duration: 3000
            })
        }
    }

    return (
        <Link 
            to={`/notes/${note._id}`}
            className="card bg-base-100 hover:shadow-secondary/50 shadow-lg transition-all duration-200 border-t-4 border-solid border-secondary"
        >
            <div className="card-body">
                <h3 className="card-title text-base-content">{note.title}</h3>
                <p className="text-base-content/70 line-clamp-3">{note.content}</p>
                <div className="card-actions justify-between items-center mt-4">
                    <span className="text-sm text-base-content/60">
                        {formatDate(new Date(note.createdAt))}
                    </span>
                    <div className="flex items-center gap-1">
                        <PenSquareIcon className="size-4" />
                        <button className="btn btn-ghost btn-xs text-error hover:shadow-error/50 shadow-lg" onClick={(e) => handleDelete(e, note._id)}>
                            <Trash2Icon className="size-4" />
                        </button>

                    </div>
                </div>
            </div>
        </Link>
    )
}

export default NoteCard;

