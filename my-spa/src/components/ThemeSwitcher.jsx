import { useEffect, useState } from "react";

export default function ThemeSwitcher() {
  const [darkMode] = useState(() => {
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

  return null;
}
