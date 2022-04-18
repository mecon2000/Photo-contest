import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Upload } from "./pages/Upload";
import { Vote } from "./pages/Vote";
import { Contests } from "./pages/Contests";
import { ShowWinners } from "./pages/ShowWinners";
import "./index.css";
import "./styles/global.scss";
import App from "./App";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route exact path="upload" element={<Upload />} />
          <Route exact path="vote" element={<Vote />} />
          <Route exact path="contests" element={<Contests />} />
          <Route exact path="showwinners" element={<ShowWinners />} />
          <Route index element={<Contests />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
