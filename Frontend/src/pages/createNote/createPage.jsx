import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { ArrowLeftCircleIcon } from "lucide-react";
import toast from "react-hot-toast";

import api from "../../lib/axios";



const CreatePage = () => {

    const [ title, setTitle ] = useState('');
    const [ content, setContent ] = useState('');
    const [ loading, setLoading ] = useState(false);
    //bring user back to home page
    const navigate = useNavigate()

    const loadingState = (
        <>
        <span className="loading loading-infinity"></span>
        Uploading note...
        </>
    )

    //handle form submissions of new notes
    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log(title)
        console.log(content)
        if(!title.trim() || !content.trim()){
            toast.error("❌All fields are required!")
            return
        };
        setLoading(true)
        try {
            await api.post("/notes", {
                title,
                content
            });
            toast.success("Note created successfully! ✅")
            navigate("/")
        } catch (error) {
            //429 Too Many Requests, if that
            if(error.response?.status === 429){
                setRateLimited(true)
                toast.error("Too many creation requests, please try again later!")
            } else {
                toast.error("Error creating note")
            }
            console.log(`Note creation failed: ${error}`)
            toast.error("Failed to create note!", {
                icon: "❌"
            })
        } finally {
            setLoading(false)
        }
        
    }

    return(
        <div className="min-h-screen bg-base-200">
            <div className="container mx-auto px-4 py-8">
                <div className="max-w-2xl mx-auto">
                    <Link to={"/"} className="btn btn-ghost mb-6 btn-secondary">
                        <ArrowLeftCircleIcon className="size-5" />
                        Back to Notes
                    </Link>
                    <section className="card bg-base-100">
                        <div className="card-body">
                            <h2 className="card-title text-2xl mb-4">
                                Create New Note
                            </h2>
                            <form onSubmit={handleSubmit}>
                                <div className="form-control mb-4 flex flex-col">
                                    <label className="label">
                                        <span className="label-text">Title</span>
                                    </label>
                                    <input type="text"
                                        placeholder="Note Title"
                                        className="input input-primary input-bordered min-w-full"
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                        disabled={loading}
                                    />
                                </div>
                                <div className="form-control mb-4 flex flex-col">
                                    <label className="label">
                                        <span className="label-text">Content</span>
                                    </label>
                                    <textarea 
                                        placeholder="Write your note here..."
                                        className="textarea textarea-accent textarea-bordered h-32 min-w-full"
                                        value={content}
                                        onChange={(e) => setContent(e.target.value)}
                                        disabled={loading}
                                    />
                                </div>
                                <div className="card-actions justify-end">
                                    <button type="submit" className="btn btn-soft btn-secondary" disabled={loading}>
                                        {loading ? loadingState : "Create Note"}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    )
};

export default CreatePage;