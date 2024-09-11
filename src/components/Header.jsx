import React, { useState } from "react";
import Button from "./Button";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const [burgerOpen, setBurgerOpen] = useState(false);
  const [style, setStyle] = useState("tab-container closed");
  const dropdown = document.getElementById("dropdown-id");
  const buttons = document.querySelectorAll(".tab");
  const handleAbout = () => {
    navigate("/");
    toggleBurger();
  };
  const handleContact = () => {
    navigate("/contact");
    toggleBurger();
  };
  const handlePortfolio = () => {
    navigate("/portfolio");
    toggleBurger();
  };

  const toggleBurger = () => {
    if (!burgerOpen) {
      setStyle("tab-container open");
      // dropdown.style.height = "900px";
      dropdown.style.right = "0px";
      dropdown.style.opacity = "1";
    } else if (burgerOpen) {
      setStyle("tab-container closed");
      dropdown.style.right = "-620px";
      dropdown.style.opacity = "0";
      // dropdown.style.height = "500px";
    }
    setBurgerOpen(!burgerOpen);
  };

  return (
    <header>
      <div className="logo-text-container">
        <h1>JB</h1>
      </div>
      <div className="burger-container" tabIndex="0" onClick={toggleBurger}>
        <div className="hamburger burger1" />
        <div className="hamburger burger2" />
        <div className="hamburger burger3" />
      </div>
      <div className={style} id="dropdown-id">
        <Button onClick={handleAbout} text={"About"} className={"tab col-a"} />
        <Button
          onClick={handlePortfolio}
          text={"Portfolio"}
          className={"tab col-b"}
        />
        <Button
          onClick={handleContact}
          text={"Contact"}
          className={"tab col-c"}
        />
      </div>
    </header>
  );
};

export default Header;
