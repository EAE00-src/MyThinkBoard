import { BookAlert } from "lucide-react"
import {Link} from "react-router"


const NotesError = () => {
    return (
        <div className="flex flex-col items-center justify-center py-16 space-y-6 max-w-md mx-auto text-center">
            <div className="bg-primary/10 rounded-full p-8">
                <BookAlert className="size-10" color="var(--color-error)"/>
            </div>
            <h3 className="text-2xl font-bold text-error">Page Note Found!</h3>
            <p className="text-base-content/70">
                It looks like you ended up on the wrong side of town!
            </p>
            <Link to={"/"} className="btn btn-soft btn-accent">
                Create Your First Note Here!
            </Link>
        </div>
    )
}

export default NotesError;