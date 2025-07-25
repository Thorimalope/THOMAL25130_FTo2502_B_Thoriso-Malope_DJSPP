import React from "react";
import "./index.css";

const SimpleThemeToggle = ({ isDarkMode, onToggle }) => {
  return (
    <div className="theme-toggle-container">
      <span className="theme-label">{isDarkMode ? "🌙" : "☀️"}</span>
      <label className="toggle">
        <input
          type="checkbox"
          className="toggle-input"
          checked={isDarkMode}
          onChange={onToggle}
        />
        <span className="toggle-fill"></span>
      </label>
      <span className="theme-label">{isDarkMode ? "Dark" : "Light"}</span>
    </div>
  );
};

export default SimpleThemeToggle;
