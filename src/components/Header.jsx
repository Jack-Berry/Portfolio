import React, { useState } from "react";
import Button from "./Button";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const [burgerOpen, setBurgerOpen] = useState(false);
  const [style, setStyle] = useState("tab-container closed");
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
    } else if (burgerOpen) {
      setStyle("tab-container closed");
    }
    setBurgerOpen(!burgerOpen);
  };

  return (
    <header>
      <div className="logo-text-container">
        <h1>JB</h1>
      </div>
      <div className="burger-container" tabIndex="0" onClick={toggleBurger}>
        {/* <svg
          fill="#FFFFFF"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 50 50"
          width="60px"
          height="60px"
        >
          <path d="M 5 8 A 2.0002 2.0002 0 1 0 5 12 L 45 12 A 2.0002 2.0002 0 1 0 45 8 L 5 8 z M 5 23 A 2.0002 2.0002 0 1 0 5 27 L 45 27 A 2.0002 2.0002 0 1 0 45 23 L 5 23 z M 5 38 A 2.0002 2.0002 0 1 0 5 42 L 45 42 A 2.0002 2.0002 0 1 0 45 38 L 5 38 z" />
        </svg> */}
        <div className="hamburger burger1" />
        <div className="hamburger burger2" />
        <div className="hamburger burger3" />
      </div>
      <div className={style}>
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
