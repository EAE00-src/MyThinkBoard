import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import toast from "react-hot-toast";
import { PacmanLoader } from "react-spinners";
import { ArrowLeftCircleIcon, Trash2Icon } from "lucide-react";

import api from "../../lib/axios";



const NotePage = () => {

    const [note, setNote] = useState(null);
    const [loading, setLoading] = useState(false);
    const [saving, setSaving] = useState(false);

    const navigate = useNavigate()
    const {id} = useParams()

    //show the note page useEffect
    useEffect(() => {
        const fetchNote = async () => {
            try {
                const res = await api.get(`/notes/${id}`)
                setNote(res.data)
            } catch (error) {
                console.error(`Error retrieving note: ${error}`)
                toast.error("Failed to retrieve the note", {
                    icon: "❌"
                })
            } finally{
                setLoading(false)
            }
        };
        //initiate note retrieval
        fetchNote();
    }, [id]);
    //If loading state is true during GET request, display loader, otherwise show the note content
    if(loading){
        return (
            <div className="min-h-screen bg-base-200 flex flex-col items-center justify-center">
                <PacmanLoader className="size-10" color="var(--color-secondary)" />
                <span className="text-2xl font-bold font-mono tracking-tight">Loading...</span>
            </div>
        )
    }
    
    //DELETE request function
    const handleDelete = async (e, id) =>{
        if(!window.confirm("Are you sure you want to delete this note?")) return

        try {
            await api.delete(`/notes/${id}`)
            toast.success("Note deleted successfully!", {
                icon:"✅",
                duration: 3000
            })
            navigate("/");
        } catch (error) {
            console.error("Note could not be deleted.", error)
            toast.error("Failed to delete note!", {
                icon: "❌",
                duration: 3000
            })
        }
    }
    //modify/PUT request function
    const handleSave = async (e) => {
        if(!note.title.trim() || !note.content.trim()){
            toast.error("Please add a title or content!", {
                icon: "❌"
            })
            return;
        }

        setSaving(true)
        try {
            await api.put(`/notes/${id}`, note)
            toast.success("Note updated successfully!")
            navigate("/")
        } catch (error) {
            console.error(`Failed to update note: ${error}`)
            toast.error("Failure updating note!", {
                icon: "❌"
            })
            
        } finally {
            setSaving(false)
        }
    }

   if(note) return(
        <div className="min-h-screen bg-base-200">
            <div className="container mx-auto px-4 py-8">
                <div className="max-w-2xl mx-auto">
                    {/*top buttons*/}
                    <div className="flex items-center justify-between mb-6">
                        <Link to={"/"} className="btn btn-secondary btn-ghost">
                            <ArrowLeftCircleIcon className="size-5" />
                            Back to Notes
                        </Link>
                        <button className="btn btn-error btn-ghost btn-s text-warning" onClick={(e) => handleDelete(e, note._id)}>
                            <Trash2Icon className="size-5" color="var(--color-error)" />
                            Delete Note
                        </button>
                    </div>
                    {/*text inputs*/}
                    <div className="card bg-base-100">
                        <div className="card-body">
                            <div className="form-control mb-4 flex flex-col">
                                <label className="label">
                                    <span className="label-text">Title</span>
                                </label>
                                <input 
                                    type="text"
                                    placeholder="Note title"
                                    className="input input-primary input-bordered min-w-full"
                                    value={note.title}
                                    onChange={(e) => setNote({...note, title: e.target.value})}
                                />
                            </div>
                            <div className="form-control mb-4 flex flex-col">
                                <label className="label">
                                    <span className="label-text">Content</span>
                                </label>
                                <textarea 
                                    placeholder="Write your note's content here..."
                                    className="textarea textarea-bordered textarea-accent h-32 min-w-full"
                                    value={note.content}
                                    onChange={(e) => setNote({...note, content: e.target.value})}
                                />
                            </div>
                        </div>
                        <div className="card-actions justify-end m-2.5">
                        <button className="btn btn-secondary btn-soft" disabled={saving} onClick={handleSave}>
                            {saving ? "Saving..." : "Save Changes"}
                        </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NotePage;