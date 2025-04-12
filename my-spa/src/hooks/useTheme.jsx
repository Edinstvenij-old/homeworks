import { useEffect, useState } from "react";

export function useTheme() {
  const [darkMode, setDarkMode] = useState(() => {
    // При загрузке проверяем localStorage
    return localStorage.getItem("theme") === "dark";
  });

  const toggleTheme = () => {
    setDarkMode((prev) => !prev); // Переключение состояния
  };

  useEffect(() => {
    const root = document.documentElement; // Получаем корневой элемент
    if (darkMode) {
      root.classList.add("dark-mode"); // Добавляем темную тему
      localStorage.setItem("theme", "dark"); // Сохраняем состояние в localStorage
    } else {
      root.classList.remove("dark-mode"); // Убираем темную тему
      localStorage.setItem("theme", "light"); // Сохраняем состояние в localStorage
    }
  }, [darkMode]); // Эффект срабатывает при изменении состояния

  return { darkMode, toggleTheme }; // Возвращаем состояния и функцию переключения
}
