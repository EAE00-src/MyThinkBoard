import { NotebookIcon } from "lucide-react"
import {Link} from "react-router"


const NotesNotFound = () => {
    return (
        <div className="flex flex-col items-center justify-center py-16 space-y-6 max-w-md mx-auto text-center">
            <div className="bg-primary/10 rounded-full p-8">
                <NotebookIcon className="size-10" color="var(--color-secondary)"/>
            </div>
            <h3 className="text-2xl font-bold text-warning">No notes yet</h3>
            <p className="text-base-content/70">
                Create your first note to get started on your note-taking journey!
            </p>
            <Link to={"/create"} className="btn btn-soft btn-accent">
                Create Your First Note!
            </Link>
        </div>
    )
}

export default NotesNotFound;