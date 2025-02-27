import { useState, useEffect } from "react";

export default function ThemeSwitchButton() {
  // Initialize theme state from localStorage or default to 'dark'
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    return savedTheme || "dark";
  });

  // Apply theme changes to the document and save to localStorage
  useEffect(() => {
    // Add or remove the 'light-theme' class on the document body
    if (theme === "light") {
      document.body.classList.add("light-theme");
    } else {
      document.body.classList.remove("light-theme");
    }

    // Save current theme preference to localStorage
    localStorage.setItem("theme", theme);
  }, [theme]);

  // Toggle between light and dark themes
  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <button onClick={toggleTheme} className="theme-button">
      {theme === "dark" ? "Light Theme" : "Dark Theme"}
    </button>
  );
}
