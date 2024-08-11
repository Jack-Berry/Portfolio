import React, { useState } from "react";
import "./css/App.scss";
import Header from "./components/Header";
import About from "./components/About";
import Footer from "./components/Footer";
import { Routes, Route } from "react-router-dom";
import What from "./components/What";
import Portfolio from "./components/Portfolio";

export default function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="Skills" element={<What />} />
        <Route path="Portfolio" element={<Portfolio />} />
        <Route path="*" element={<About />} />
      </Routes>
      <Footer />
    </>
  );
}
