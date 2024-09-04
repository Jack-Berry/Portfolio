import React from "react";

const Item = ({ title, img, description, github, live }) => {
  const handleLive = () => {
    window.open(live);
  };

  const handleRepo = () => {
    window.open(github);
  };

  return (
    <div className="item-container">
      <h2>{title}</h2>
      <img src={img} alt={title}></img>
      <p>{description}</p>
      <button onClick={handleLive}>View</button>
      <button onClick={handleRepo}>Repo</button>
    </div>
  );
};

export default Item;
