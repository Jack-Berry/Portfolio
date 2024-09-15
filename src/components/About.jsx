import React, { useEffect, useState } from "react";
import "../css/About.scss";
import jack from "../assets/jack-400x400.jpg";
import Express from "../assets/express.svg";
import Javascript from "../assets/javascript.svg";

const About = () => {
  let [toolArr, setToolArr] = useState([
    { name: "Express", img: Express },
    { name: "Javascript", img: Javascript },
    { name: "HTML5", img: "/src/assets/html5.svg" },
    { name: "NPM", img: "/src/assets/npm.svg" },
    { name: "React", img: "src/assets/react.svg" },
    { name: "Bootstrap", img: "src/assets/bootstrap.svg" },
    { name: "Redux", img: "src/assets/redux.svg" },
    { name: "Vite", img: "src/assets/vite.svg" },
    { name: "Sass", img: "src/assets/sass.svg" },
    { name: "mySQL", img: "src/assets/mysql.svg" },
    { name: "Git", img: "src/assets/git.svg" },
    { name: "CSS3", img: "src/assets/css3.svg" },
    { name: "Node.Js", img: "src/assets/nodedotjs.svg" },
    { name: "Next.js", img: "src/assets/nextdotjs.svg" },
    { name: "Joi", img: "src/assets/black_shape.png" },
  ]);
  let [arrCounter, setArrCounter] = useState(0);
  let [runCounter, setRunCounter] = useState(0);
  let message = toolArr[arrCounter].name;

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
  }

  return (
    <>
      <div className="main about-container">
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
            <div className="img-border" />
            <img src={jack} alt="" />
          </div>
          <div className="about-text-container">
            <p>
              My name is Jack Berry and I am a nerd, tech lover and software
              engineer. I enjoy solving complex problems, whether it's frontend
              or backend, hardware or software.
            </p>
            <p>
              I am a graduate of The Jump Digital School, completing their 3
              month Full-Stack Software Engineer bootcamp. During this I
              completed multiple projects, including a larger scale full-stack
              project. I also have previous experience of programming in Swift.
            </p>
            <p>
              At this point I know what I have written is shit, so I am just
              going to treat this as a placeholder and come back to it when my
              brain is braining. At least it is a similarly sized block of text,
              so I can continue working on the project with a reasonable idea of
              what it'll look like.
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
