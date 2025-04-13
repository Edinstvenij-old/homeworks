import { NavLink } from "react-router-dom";
import { useTheme } from "../hooks/useTheme";
// import { FaSun, FaMoon } from "react-icons/fa"; // 2 вариант

export default function Header() {
  const { darkMode, toggleTheme } = useTheme();

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
          onClick={toggleTheme}
          className="theme-toggle"
          aria-label="Toggle theme"
          title="Toggle theme"
        >
          {darkMode ? "🌙" : "☀️"}
          {/* {darkMode ? <FaSun /> : <FaMoon />} */}
        </button>
      </div>
    </header>
  );
}
