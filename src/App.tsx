import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./Pages/Home";
import CreatePost from "./Pages/CreatePost";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Profile from "./Pages/Profile";

function App() {
  return (
    

    <BrowserRouter>
      <Routes>

        {/* Página principal */}
        <Route path="/" element={<Home />} />
        <Route path="/create-post" element={<CreatePost />} />

        {/* Login */}
        <Route path="/login" element={<Login />} />
        {/* Register */}
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />

      </Routes>
    </BrowserRouter>
        
  );
}

export default App;