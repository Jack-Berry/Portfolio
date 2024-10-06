import React, { useState } from "react";
import Item from "./Item";
import "../css/portfolio.scss";
import Hyundai from "../assets/Hyundai-desktop.jpg";
import Weather from "../assets/Weather-desktop.jpg";
import PortfolioImg from "../assets/Portfolio-desktop.jpg";
import HolidoughUI from "../assets/Holidough-desktop.jpg";
import HolidoughExpense from "../assets/Holidough-AddExpense.jpg";
import HolidoughBillSplits from "../assets/Holidough-BillSplits.jpg";

const Portfolio = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const holidoughItems = [
    {
      img: HolidoughUI,
      description:
        "Holidough is a complete holiday budgeting app with an intuitive UI. This is a full-stack React app I built as part of a group project. My primary role was handling all input and processing of the expense data.",
    },
    {
      img: HolidoughExpense,
      description:
        "This involved taking the data inputted by the user, converting it into the correct formats, then saving as an object with a unique ID. If it was a multi day expense, a function I wrote would split this expense up into multiple expense objects which would recieve a seperate shared ID. This meant multiday expenses could then be edited as an individual expense for each day or repackaged as a multi day expense to be edited.",
    },
    {
      img: HolidoughBillSplits,
      description:
        "I also wrote the optional bill splitting feature. This operated similarly to creating an expense, but can be added, removed or edited independently of the expense. These can easily be split evenly wby pressing the button or the amount can be inputted manually.",
    },
  ];
  const portfolioItems = [
    {
      title: "This website",
      img: PortfolioImg,
      description: "Of course this website had to be included!",
      github: "https://github.com/Jack-Berry/Portfolio",
      live: "https://www.berrydev.co.uk/",
      style: "item-container item-a",
    },
    {
      title: "Hyundai Homage",
      img: Hyundai,
      description:
        "A homage to the Hyundai website using only vanilla CSS and HTML.",
      github: "https://github.com/Jack-Berry/JB-Homage",
      live: "https://main--hyundai-homage.netlify.app/",
      style: "item-container item-b",
    },
    {
      title: "Weather App",
      img: Weather,
      description:
        "A simple weather app using the Open Weather API and vanilla Javascript and CSS.",
      github: "https://github.com/Jack-Berry/Weather",
      live: "https://jbweather-app.netlify.app/",
      style: "item-container item-c",
    },
    // {
    //   title: "The Simpsons Quotes",
    //   img: "https://kgarayev.com/claimsmanagement2.jpg",
    //   description: "Simpsons quotes with filtering etc",
    //   github: "git link",
    //   live: "live link",
    //   style: "item-container item-d",
    // },
  ];

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === holidoughItems.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? holidoughItems.length - 1 : prevIndex - 1
    );
  };

  const handleLive = () => {
    window.open("https://holidough.uk/");
  };

  const handleFront = () => {
    window.open("https://github.com/russell-gh/travel-tally");
  };

  const handleBack = () => {
    window.open("https://github.com/russell-gh/travel-tally-back-end");
  };

  return (
    <div className="main portfolio-container">
      <h1>Portfolio</h1>
      <div className="holidough-container">
        <h2>Holidough</h2>
        <div className="holidough-carousel">
          <button onClick={prevSlide}>Previous</button>
          <div className="holidough-item">
            <img
              src={holidoughItems[currentIndex].img}
              alt={holidoughItems[currentIndex].title}
            />
            <p>{holidoughItems[currentIndex].description}</p>
          </div>
          <button onClick={nextSlide}>Next</button>
        </div>
        <div className="holidough-buttons">
          <button className="view" onClick={handleLive}>
            View
          </button>
          <button className="front" onClick={handleFront}>
            Front-end
          </button>
          <button className="backend" onClick={handleBack}>
            Back-end
          </button>
        </div>
      </div>
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
