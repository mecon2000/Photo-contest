import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { Upload } from "./pages/Upload";
import { Vote } from "./pages/Vote";
import { Contests } from "./pages/Contests";
import { ShowWinners } from "./pages/ShowWinners";
import Dropzone from "./dropzone/Dropzone";
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/:user/upload" element={<Upload/>} />
        <Route exact path="/upload" element={<Upload/>} />
        <Route exact path="/contests" element={<Contests/>} />
        <Route exact path="/vote" element={<Vote/>} />
        <Route exact path="/showwinners" element={<ShowWinners/>} />
        <Route exact path="/old-dropzone" element={<Dropzone/>} />
        <Route path="/" element={<Contests/>} />
      </Routes>
    </Router>
  );
}
export default App;
