import { createContext, useContext, useState, useEffect } from "react";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("theme");
      if (stored) return stored === "dark";
      return (
        window.matchMedia?.("(prefers-color-scheme: dark)").matches ?? false
      );
    }
    return false;
  });

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove(darkMode ? "light-mode" : "dark-mode");
    root.classList.add(darkMode ? "dark-mode" : "light-mode");
    if (typeof window !== "undefined") {
      localStorage.setItem("theme", darkMode ? "dark" : "light");
    }
  }, [darkMode]);

  const toggleTheme = () => setDarkMode((prev) => !prev);

  return (
    <ThemeContext.Provider value={{ darkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
