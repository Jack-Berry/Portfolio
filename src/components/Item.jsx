import React from "react";

const Item = ({ title, img, description, github, live, style }) => {
  const handleLive = () => {
    window.open(live);
  };

  const handleRepo = () => {
    window.open(github);
  };

  return (
    <div className={style}>
      <h2>{title}</h2>
      <img src={img} alt={title}></img>
      <div className="item-button-container">
        <button className="view" onClick={handleLive}>
          View
        </button>
        <button className="repo" onClick={handleRepo}>
          Repo
        </button>
      </div>
      <p>{description}</p>
    </div>
  );
};

export default Item;
