import React, { useState } from "react";
import "./css/App.scss";
import Header from "./components/Header";
import About from "./components/About";

export default function App() {
  return (
    <>
      <Header />
      <About />
    </>
  );
}
