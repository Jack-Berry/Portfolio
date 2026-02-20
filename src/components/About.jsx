import React, { useEffect, useRef, useState } from "react";
import "../css/About.scss";
import TechRainCanvas from "./TechRainCanvas";
import RandomDotsCanvas from "./RandomDotsCanvas";
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
  let [hoverCycling, setHoverCycling] = useState(false);
  const [lockedHover, setLockedHover] = useState(false);
  const [bgVariant, setBgVariant] = useState("a");
  const hoverLeaveTimer = useRef(null);
  const mousePosRef = useRef({ x: null, y: null });
  const dotsPausedRef = useRef(false);
  const [showHint, setShowHint] = useState(false);
  const hintTimerRef = useRef(null);

  const selectVariant = (v) => {
    setBgVariant(v);
    setShowHint(true);
    clearTimeout(hintTimerRef.current);
    hintTimerRef.current = setTimeout(() => setShowHint(false), 3500);
  };

  // Initial animation on mount — cycles through tools twice then stops
  useEffect(() => {
    let counter = 0;
    let run = 0;
    const loop = setInterval(() => {
      counter++;
      if (counter > toolArr.length - 1) {
        setArrCounter(0);
        counter = 0;
        run++;
      }
      setArrCounter(counter);
      if (run === 2) {
        clearInterval(loop);
        setRunCounter(2);
      }
    }, 150);

    return () => clearInterval(loop);
  }, []);

  // Arrow fade — runs once after initial animation completes
  useEffect(() => {
    if (runCounter !== 2) return;
    const arrows = document.getElementById("down");
    if (!arrows) return;
    const t1 = setTimeout(() => {
      arrows.style.opacity = 0.4;
    }, 2500);
    const t2 = setTimeout(() => {
      arrows.style.opacity = 0;
    }, 4000);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [runCounter]);

  // Hover cycling — restarts when the user hovers the intro container or spinner
  useEffect(() => {
    if (!hoverCycling) return;
    let counter = arrCounter;
    const loop = setInterval(() => {
      counter = (counter + 1) % toolArr.length;
      setArrCounter(counter);
    }, 150);
    return () => clearInterval(loop);
  }, [hoverCycling]);

  // Debounced handlers so moving between .intro-container and .spinner
  // siblings doesn't briefly stop cycling
  const handleMouseEnter = () => {
    clearTimeout(hoverLeaveTimer.current);
    clearTimeout(hintTimerRef.current);
    setHoverCycling(true);
    setShowHint(false);
  };
  const handleMouseLeave = () => {
    if (lockedHover) return;
    hoverLeaveTimer.current = setTimeout(() => setHoverCycling(false), 50);
  };
  const handleClick = () => {
    if (lockedHover) {
      setLockedHover(false);
      dotsPausedRef.current = false;
    } else {
      setLockedHover(true);
      clearTimeout(hoverLeaveTimer.current);
      setHoverCycling(true);
      if (bgVariant === "c") dotsPausedRef.current = true;
    }
  };
  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mousePosRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
  };

  const isAnimating = runCounter < 2 || hoverCycling;
  const colourClass = isAnimating ? `text-cycle-${arrCounter % 4}` : "";

  let message = toolArr[arrCounter].name;
  if (!isAnimating) {
    message = "Tech";
  }

  return (
    <>
      {/* ── TEMPORARY preview switcher — remove once a variant is chosen ── */}
      <div className="preview-switcher">
        <span
          className={`hover-hint${showHint && !hoverCycling ? " hover-hint--visible" : ""}`}
        >
          hover to explore
        </span>
        {["A", "B", "C"].map((v) => (
          <button
            key={v}
            className={`preview-btn${bgVariant === v.toLowerCase() ? " active" : ""}`}
            onClick={() => selectVariant(v.toLowerCase())}
          >
            {v}
          </button>
        ))}
      </div>

      <div className="main about-container" onMouseMove={handleMouseMove}>
        {/* Background effect — behind all content in the section */}
        <div
          className={`intro-bg intro-bg--${bgVariant}${hoverCycling ? " intro-bg--active" : ""}`}
        >
          {bgVariant === "a" && (
            <>
              <span
                className={`ring ring-1${hoverCycling ? " ring--active" : ""}`}
              />
              <span
                className={`ring ring-2${hoverCycling ? " ring--active" : ""}`}
              />
              <span
                className={`ring ring-3${hoverCycling ? " ring--active" : ""}`}
              />
              <span
                className={`ring ring-4${hoverCycling ? " ring--active" : ""}`}
              />
            </>
          )}
          {bgVariant === "b" && (
            <TechRainCanvas
              active={hoverCycling}
              words={toolArr.map((t) => t.name)}
            />
          )}
          {bgVariant === "c" && (
            <RandomDotsCanvas active={hoverCycling} mousePosRef={mousePosRef} pausedRef={dotsPausedRef} />
          )}
        </div>

        <div className="down" id="down">
          <img src={arrow} className="arrow left" />
          <img src={arrow} className="arrow right" />
        </div>
        <div
          className="intro-container"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onClick={handleClick}
        >
          <h1>Hi! I'm Jack</h1>
          <h2>I am a JavaScript Full-Stack Developer</h2>
          <div
            className={`anim-container${isAnimating ? " anim-container--active" : ""}`}
          >
            <h2 className="i-like">I like using </h2>
            <h2
              id="text-anim"
              className={`text-anim${colourClass ? ` ${colourClass}` : " text-anim--settled"}`}
            >
              {message}
            </h2>
          </div>
        </div>
        <div
          className={`spinner${hoverCycling ? " spinner--active" : ""}`}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onClick={handleClick}
        />
        <div className="about-body-container">
          <div className="about-img-container">
            <img src={jack} alt="Jack Berry" />
          </div>
          <div className="about-text-container">
            <p>
              I’m a Software Engineer, nerd, and tech lover who loves learning
              about new techniques and tools to solve complex problems across
              the full tech-stack.
            </p>
            <p>
              Expanding on my experience as a Swift developer, I completed a
              3-month immersive full-stack software engineering bootcamp with{" "}
              <a
                href="https://www.thejump.tech/"
                target="_blank"
                rel="noopener noreferrer"
              >
                The Jump
              </a>{" "}
              learning JavaScript, React, Node, MongoDB, GSAP, Testing, CSS, and
              more to a professional standard, and built multiple projects,
              including a large-scale full-stack application.
            </p>

            <p>
              I’m also experienced in using and augmenting audio as a sound
              engineer.
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
