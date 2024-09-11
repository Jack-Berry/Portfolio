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
      style: "item-container item-a",
    },
    {
      title: "Hyundai Homage",
      img: "https://kgarayev.com/investmentapp.jpg",
      description:
        "A homage to the Hyundai website using only vanilla CSS and HTML.",
      github: "https://github.com/Jack-Berry/JB-Homage",
      live: "https://main--hyundai-homage.netlify.app/",
      style: "item-container item-b",
    },
    {
      title: "Holidough",
      img: "https://kgarayev.com/fakeairbnb.jpg",
      description:
        "Complete holiday budgeting app with an intuitive UI. This is a full-stack React app using lots of cool things I'll list later",
      github: "git link",
      live: "live link",
      style: "item-container item-c",
    },
    {
      title: "Weather App",
      img: "https://kgarayev.com/theceng.jpg",
      description:
        "A simple weather app using the Open Weather API and vanilla Javascript and CSS. I have included some dynamic styling depending on the weather and a simple programatic animation based on the chance of rain.",
      github: "https://github.com/Jack-Berry/Weather",
      live: "https://jbweather-app.netlify.app/",
      style: "item-container item-d",
    },
    {
      title: "The Simpsons Quotes",
      img: "https://kgarayev.com/claimsmanagement2.jpg",
      description: "Simpsons quotes with filtering etc",
      github: "git link",
      live: "live link",
      style: "item-container item-a",
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
              live={item.live}
              github={item.github}
              style={item.style}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Portfolio;
