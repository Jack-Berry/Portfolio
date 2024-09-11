import React, { useEffect, useState } from "react";
import "../css/about.scss";

const About = () => {
  let [toolArr, setToolArr] = useState([
    "Express",
    "Javascript",
    "HTML5",
    "NPM",
    "React",
    "Bootstrap",
    "Redux",
    "Vite",
    "Sass",
    "mySQL",
    "Git",
    "CSS3",
    "Node.Js",
  ]);
  let [arrCounter, setArrCounter] = useState(0);
  let [runCounter, setRunCounter] = useState(0);

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
      // setRunCounter(run);
      setArrCounter(counter);
      console.log("ran", run, runCounter);
      if (run === 2) {
        stop();
        setToolArr(["Tech"]);
      }
    }, 150);

    function stop() {
      clearInterval(loop);
    }
  };

  useEffect(() => {
    startCounter();
  }, []);

  console.log(arrCounter, toolArr.length);
  return (
    <>
      <div className="main about-container">
        <div className="intro-container">
          <h1>Hi! I'm Jack</h1>
          <h2>I am a JavaScript Full-Stack Developer</h2>
          <div className="anim-container">
            <h2 className="i-like">I like using </h2>
            <h2 className="text-anim">{toolArr[arrCounter]}</h2>
          </div>
        </div>
        <div className="spinner" />
        <div className="about-body-container">
          {/* <h2>About</h2> */}
          <div className="about-img-container">
            <img src="src/assets/jack-400x400.jpg" alt="" />
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
      </div>
    </>
  );
};

export default About;
