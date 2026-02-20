import React, { useState, useRef, useEffect } from "react";
import { useLocation } from "react-router-dom";
import RandomDotsCanvas from "./RandomDotsCanvas";
import "../css/GlobalEffect.scss";

const GlobalEffect = () => {
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < 860);
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [lockedActive, setLockedActive] = useState(false);
  const squareLockedRef = useRef(false); // also used as pausedRef for the canvas
  const [aboutVisible, setAboutVisible] = useState(false);
  const mousePosRef = useRef({ x: null, y: null });
  const location = useLocation();

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 859px)");
    setIsMobile(mq.matches);
    const handler = (e) => setIsMobile(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  // Track whether the About section is in view. Switch happens when the bottom of
  // .about-container passes 30% up the viewport — feels responsive without being
  // too eager. Also syncs a body class so About.scss can fade its A/B/C buttons.
  useEffect(() => {
    const check = () => {
      const el = document.querySelector(".about-container");
      const visible = el
        ? el.getBoundingClientRect().bottom > window.innerHeight * 1.3
        : false;
      setAboutVisible(visible);
      document.body.classList.toggle("ge-active", !visible);
    };

    let raf1, raf2;
    raf1 = requestAnimationFrame(() => {
      raf2 = requestAnimationFrame(check);
    });

    window.addEventListener("scroll", check, { passive: true });
    return () => {
      cancelAnimationFrame(raf1);
      cancelAnimationFrame(raf2);
      window.removeEventListener("scroll", check);
      document.body.classList.remove("ge-active");
    };
  }, [location.pathname]);

  if (isMobile) return null;

  const active = enabled && (lockedActive || hovering);

  const handleSquareMouseMove = (e) => {
    if (squareLockedRef.current) return;
    const rect = e.currentTarget.getBoundingClientRect();
    mousePosRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
  };

  const handleSquareMouseEnter = () => setHovering(true);

  // No lock check needed — lockedActive independently keeps active=true
  const handleSquareMouseLeave = () => {
    setHovering(false);
    mousePosRef.current = { x: null, y: null };
  };

  const handleSquareClick = () => {
    if (squareLockedRef.current) {
      squareLockedRef.current = false;
      setLockedActive(false);
    } else {
      squareLockedRef.current = true;
      setLockedActive(true);
      mousePosRef.current = { x: null, y: null };
    }
  };

  return (
    <>
      {/* Canvas always stays mounted so frozen dots persist when scrolling to About */}
      <RandomDotsCanvas
        active={active}
        mousePosRef={mousePosRef}
        pausedRef={squareLockedRef}
        dotAlpha={0.4}
        canvasStyle={{
          position: "fixed",
          inset: 0,
          width: "100vw",
          height: "100vh",
          pointerEvents: "none",
          zIndex: 1,
        }}
      />
      {/* Widget controls hide when About section is visible */}
      {!aboutVisible && (
        <div className="ge-widget">
          {enabled && (
            <div
              className="ge-square"
              onMouseMove={handleSquareMouseMove}
              onMouseEnter={handleSquareMouseEnter}
              onMouseLeave={handleSquareMouseLeave}
              onClick={handleSquareClick}
            />
          )}
          <button
            className={`ge-toggle${enabled ? " ge-toggle--active" : ""}`}
            onClick={() => setEnabled((v) => !v)}
            aria-label="Toggle background dots"
          >
            ●
          </button>
        </div>
      )}
    </>
  );
};

export default GlobalEffect;
