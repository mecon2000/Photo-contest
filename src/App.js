import React from "react";
import { Outlet } from "react-router-dom";
import { Header } from "./pages/layouts/Header";
import { Footer } from "./pages/layouts/Footer";
import "./App.css";

function App() {
  return (
    <>
      <Header />
      <Outlet className="main-wrapper"/>
      <Footer />
    </>
  );
}
export default App;
