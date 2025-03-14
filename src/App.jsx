import React, { useState } from "react";
import "./css/App.scss";
import Header from "./components/Header";
import About from "./components/About";
import Footer from "./components/Footer";
import { Routes, Route } from "react-router-dom";
import Portfolio from "./components/Portfolio";
import Contact from "./components/Contact";
import Home from "./components/Home";
import ScrollToTop from "./components/ScrollToTop";

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Header />
      <Routes>
        <Route path="About" element={<About />} />
        <Route path="Contact" element={<Contact />} />
        <Route path="Portfolio" element={<Portfolio />} />
        <Route path="*" element={<Home />} />
      </Routes>
      <Footer />
    </>
  );
}
