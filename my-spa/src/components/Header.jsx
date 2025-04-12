import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { FaSun, FaMoon } from "react-icons/fa";

export default function Header() {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.classList.add("dark-mode");
      root.classList.remove("light-mode");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.add("light-mode");
      root.classList.remove("dark-mode");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  return (
    <header>
      <div className="header-inner">
        <nav>
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Головна
          </NavLink>
          <NavLink
            to="/contacts"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Контакти
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Про мене
          </NavLink>
        </nav>
        <button
          onClick={() => setDarkMode((prev) => !prev)}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            fontSize: "20px",
            color: "inherit",
          }}
          aria-label="Toggle theme"
          title="Toggle theme"
        >
          {darkMode ? <FaSun /> : <FaMoon />}
        </button>
      </div>
    </header>
  );
}
