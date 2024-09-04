import React, { useState } from "react";
import "./css/App.scss";
import Header from "./components/Header";
import About from "./components/About";
import Footer from "./components/Footer";
import { Routes, Route } from "react-router-dom";
import Portfolio from "./components/Portfolio";
import Contact from "./components/Contact";

export default function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="Contact" element={<Contact />} />
        <Route path="Portfolio" element={<Portfolio />} />
        <Route path="*" element={<About />} />
      </Routes>
      <Footer />
    </>
  );
}
