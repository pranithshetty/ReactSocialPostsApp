import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Main } from "./Pages/Main/Main";
import { Login } from "./Pages/Login";
import { Navbar } from "./Components/Navbar";
import { CreatePost } from "./Pages/CreatePost/CreatePost";
function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<h1>Page ! found</h1>} />
          <Route path="/createpost" element={<CreatePost />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
