//Packages
import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
//Components
import NavBar from "../../components/NavBar/NavBar";
import RateLimited from "../../components/Ratelimit/RateLimited";
import { FadeLoader } from "react-spinners";
import NoteCard from "../../components/NoteCard/NoteCard";



const Home = () => {
    //States
        //determines when to display the rateLimit hit UI component
        const [isRateLimited, setRateLimited] = useState(false);
        //receptor of notes once fetched from a GET request
        const [notes, setNotes] = useState([]);
        //controls the display of notes once prepared
        const [loading, setLoading] = useState(true);
    //This useEffect handles getting all notes
    useEffect(() => {
        const getNotes = async () => {
            try {
                const res = await axios.get("http://localhost:5001/api/notes");
                console.log(res.data)
                setNotes(res.data)
                setRateLimited(false)
            } catch (error) {
                console.error(`❌Error fetching notes: ${error}`)
                //429 Too Many Requests, if that
                if(error.response?.status === 429){
                    setRateLimited(true)
                    toast.error("Rate limit reached, please reload page after 20seconds")
                } else {
                    toast.error("❌Error fetching notes")
                }
            } finally{
                setLoading(false)
            }
        }
        getNotes()
    }, [])

    return(
        <div className="min-h-screen" >
            <NavBar />
            {/*Once the maximum rate limit is hit, the rateLimit UI component will be displayed*/}
            {isRateLimited && <RateLimited />}
            <div className="max-w-7xl mx-auto p-4 mt-6">
                {loading && 
                <div className="flex flex-col items-center justify-center text-center text-primary py-10">
                    <FadeLoader color="var(--color-secondary)" /> 
                    <span className="text-2xl font-bold font-mono tracking-tight">Loading...</span>
                </div>}
                {notes.length > 0 && !isRateLimited && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {notes.map((note) => (
                            <NoteCard key={note._id} note={note} />
                        ))}
                    </div>
                )}
        
            </div>
        </div>
    )
};

export default Home;