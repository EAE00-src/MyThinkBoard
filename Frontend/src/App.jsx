import {Routes, Route} from "react-router";
import toast from "react-hot-toast";

//Pages
import Home from "./pages/Home/Home.jsx";
import CreatePage from "./pages/createNote/createPage.jsx";
import NotePage from "./pages/Note/NotePage.jsx";
import NotesError from "./pages/404/404.jsx";


function App() {
  return(
        <>
        <Routes>
          <Route index element={<Home />} />
          <Route path="/create" element={<CreatePage />} />
          <Route path="/notes/:id" element={<NotePage />} />
          <Route path="/*" element={<NotesError />} />
        </Routes>
        </>
    )
}
export default App;
