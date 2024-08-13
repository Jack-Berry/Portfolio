import React from "react";

const Item = ({ title, img, description, github, live }) => {
  return (
    <div className="item-container">
      <h2>{title}</h2>
      <img src={img} alt={title}></img>
      <p>{description}</p>
    </div>
  );
};

export default Item;
