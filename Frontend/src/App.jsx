import {Routes, Route} from "react-router";
import toast from "react-hot-toast";

//Pages
import Home from "./pages/Home/Home.jsx";
import CreatePage from "./pages/createNote/createPage.jsx";
import NotePage from "./pages/Note/NotePage.jsx";


function App() {
  return(
        <>
        <Routes>
          <Route index element={<Home />} />
          <Route path="/create" element={<CreatePage />} />
          <Route path="/note/:slugs" element={<NotePage />} />
        </Routes>
        </>
    )
}
export default App;
