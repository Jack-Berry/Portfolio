import React from "react";
import Button from "./Button";

const Header = () => {
  const handleClick = (e) => {
    console.log("CLICK", e);
  };

  return (
    <header>
      <div className="logo-text-container">
        <h1>JB</h1>
      </div>
      <div className="tab-container">
        <Button onClick={handleClick} text={"About"} className={"tab"} />
        <Button
          onClick={handleClick}
          text={"What Can I Do?"}
          className={"tab"}
        />
        <Button onClick={handleClick} text={"Portfolio"} className={"tab"} />
      </div>
    </header>
  );
};

export default Header;
