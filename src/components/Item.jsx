import React, { useState } from "react";

const Item = ({ title, img, description, github, live, style, features }) => {
  const [showInfo, setShowInfo] = useState(false);

  return (
    <div className={style}>
      <h2>{title}</h2>
      <div className="item-image-wrap">
        <img src={img} alt={title} />
      </div>
      <p>{description}</p>
      <div className="item-button-container">
        <button className="view" onClick={() => window.open(live)}>
          View
        </button>
        {github && (
          <button className="repo" onClick={() => window.open(github)}>
            Repo
          </button>
        )}
        {features && features.length > 0 && (
          <button
            className="info"
            onClick={() => setShowInfo(true)}
          >
            ▲ Features
          </button>
        )}
      </div>
      {features && features.length > 0 && (
        <div className={`item-info-panel${showInfo ? " item-info-panel--open" : ""}`}>
          <ul>
            {features.map((f, i) => (
              <li key={i}>{f}</li>
            ))}
          </ul>
          <button className="item-info-close" onClick={() => setShowInfo(false)}>
            ▼ Close
          </button>
        </div>
      )}
    </div>
  );
};

export default Item;
