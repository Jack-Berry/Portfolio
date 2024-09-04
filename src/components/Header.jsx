import React from "react";
import Button from "./Button";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  // const handleClick = (link) => {
  //   console.log("Click", link);
  //   // navigate(`/${link}`);
  // };

  const handleAbout = () => navigate("/");
  const handleContact = () => navigate("/contact");
  const handlePortfolio = () => navigate("/portfolio");

  return (
    <header>
      <div className="logo-text-container">
        <h1>JB</h1>
      </div>
      <div className="tab-container">
        <Button onClick={handleAbout} text={"About"} className={"tab"} />
        <Button
          onClick={handlePortfolio}
          text={"Portfolio"}
          className={"tab"}
        />
        <Button onClick={handleContact} text={"Contact"} className={"tab"} />
      </div>
    </header>
  );
};

export default Header;
