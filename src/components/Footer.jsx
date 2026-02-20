import React from "react";

const Footer = ({ theme, toggleTheme }) => {
  return (
    <footer>
      <button
        className="theme-btn"
        onClick={toggleTheme}
        aria-label="Toggle theme"
      >
        {theme === "dark" ? "☀" : "◑"}
      </button>
      <p>Copyright © {new Date().getFullYear()} Jack Berry. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
