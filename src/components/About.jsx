import React, { useEffect, useState } from "react";
import "../css/About.scss";
import jack from "../assets/jack-400x400.jpg";
import arrow from "../assets/down.svg";
import Expressicon from "../assets/express.svg";
import Javascripticon from "../assets/javascript.svg";
import HTMLicon from "../assets/html5.svg";
import NPMicon from "../assets/npm.svg";
import Reacticon from "../assets/react.svg";
import Bootstrap from "../assets/bootstrap.svg";
import Reduxicon from "../assets/redux.svg";
import Viteicon from "../assets/vite.svg";
import Sassicon from "../assets/sass.svg";
import MYSQLicon from "../assets/mysql.svg";
import Giticon from "../assets/git.svg";
import CSSicon from "../assets/css3.svg";
import Nodeicon from "../assets/nodedotjs.svg";
import Nexticon from "../assets/nextdotjs.svg";
import Joiicon from "../assets/black_shape.png";

const About = () => {
  let [toolArr, setToolArr] = useState([
    { name: "Express", img: Expressicon },
    { name: "Javascript", img: Javascripticon },
    { name: "HTML5", img: HTMLicon },
    { name: "NPM", img: NPMicon },
    { name: "React", img: Reacticon },
    { name: "Bootstrap", img: Bootstrap },
    { name: "Redux", img: Reduxicon },
    { name: "Vite", img: Viteicon },
    { name: "Sass", img: Sassicon },
    { name: "mySQL", img: MYSQLicon },
    { name: "Git", img: Giticon },
    { name: "CSS3", img: CSSicon },
    { name: "Node.Js", img: Nodeicon },
    { name: "Next.js", img: Nexticon },
    { name: "Joi", img: Joiicon },
  ]);
  let [arrCounter, setArrCounter] = useState(0);
  let [runCounter, setRunCounter] = useState(0);
  let message = toolArr[arrCounter].name;
  const arrows = document.getElementById("down");

  const startCounter = () => {
    let counter = arrCounter;
    let run = 0;
    let loop = setInterval(() => {
      counter++;
      if (counter > toolArr.length - 1) {
        setArrCounter(0);
        counter = 0;
        run++;
      }
      setArrCounter(counter);
      if (run === 2) {
        stop();
        setRunCounter(2);
      }
    }, 150);

    function stop() {
      clearInterval(loop);
    }
  };

  useEffect(() => {
    startCounter();
  }, []);

  if (runCounter === 2) {
    message = "Tech";
    setTimeout(function () {
      arrows.style.opacity = 0.4;
    }, 2500);
    setTimeout(function () {
      arrows.style.opacity = 0;
    }, 4000);
  }

  return (
    <>
      <div className="main about-container">
        <div className="down" id="down">
          <img src={arrow} className="arrow left" />
          <img src={arrow} className="arrow right" />
        </div>
        <div className="intro-container">
          <h1>Hi! I'm Jack</h1>
          <h2>I am a JavaScript Full-Stack Developer</h2>
          <div className="anim-container">
            <h2 className="i-like">I like using </h2>
            <h2 id="text-anim" className="text-anim">
              {message}
            </h2>
          </div>
        </div>
        <div className="spinner" />
        <div className="about-body-container">
          <div className="about-img-container">
            <img src={jack} alt="" />
          </div>
          <div className="about-text-container">
            <p>
              My name is Jack Berry and I am a nerd, tech lover and software
              engineer. I enjoy solving complex problems, whether it's frontend
              or backend, hardware or software.
            </p>
            <p>
              I graduated from The Jump Digital School, where I completed an
              intensive 3-month Full-Stack Software Engineering bootcamp.
              Throughout this program, I successfully built multiple projects,
              including a large-scale full-stack application. Additionally, I
              also have experience programming in Swift.
            </p>
            <p>
              Outside of tech I enjoy walks with my 2 dachshunds, playing
              football and performing as a singer in a band. I am also a
              competent audio engineer and sound designer.
            </p>
          </div>
        </div>
        <div className="icons">
          {toolArr.map(function (tool, index) {
            return (
              <div className="icon" key={index}>
                <img src={tool.img} className="icon-img" />
                <h3>{tool.name}</h3>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default About;
