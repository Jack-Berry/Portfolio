import React, { useState } from "react";
import Item from "./Item";
import "../css/portfolio.scss";

const Portfolio = () => {
  const portfolioItems = [
    {
      title: "This website",
      img: "https://kgarayev.com/savemymarriage.jpg",
      description: "Of course this website had to be included!",
      github: "git link",
      live: "live link",
    },
    {
      title: "Hyundai Homage",
      img: "https://kgarayev.com/investmentapp.jpg",
      description:
        "A homage to the Hyundai website using only vanilla CSS and HTML.",
      github: "git link",
      live: "live link",
    },
    {
      title: "Holidough",
      img: "https://kgarayev.com/fakeairbnb.jpg",
      description:
        "Complete holiday budgeting app with an intuitive UI. This is a full-stack React app using lots of cool things I'll list later",
      github: "git link",
      live: "live link",
    },
    {
      title: "Weather App",
      img: "https://kgarayev.com/theceng.jpg",
      description:
        "A simple weather app using the Open Weather API and vanilla Javascript and CSS.",
      github: "git link",
      live: "live link",
    },
    {
      title: "The Simpsons Quotes",
      img: "https://kgarayev.com/claimsmanagement2.jpg",
      description: "Simpsons quotes with filtering etc",
      github: "git link",
      live: "live link",
    },
  ];

  return (
    <div className="main portfolio-container">
      <h1>Portfolio</h1>
      <div className="all-items-container">
        {portfolioItems.map(function (item) {
          return (
            <Item
              title={item.title}
              img={item.img}
              description={item.description}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Portfolio;
