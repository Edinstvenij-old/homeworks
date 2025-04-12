import { createContext, useContext, useState, useEffect } from "react";

// Создаем контекст для темы
const ThemeContext = createContext();

// Поставщик контекста, который будет оборачивать компоненты и предоставлять доступ к теме
export function ThemeProvider({ children }) {
  const [darkMode, setDarkMode] = useState(() => {
    // Проверка состояния темы при первоначальной загрузке
    return localStorage.getItem("theme") === "dark";
  });

  useEffect(() => {
    // Получаем root элемент
    const root = document.documentElement;

    if (darkMode) {
      // Добавляем темную тему, удаляем светлую
      root.classList.add("dark-mode");
      root.classList.remove("light-mode");
      localStorage.setItem("theme", "dark");
    } else {
      // Добавляем светлую тему, удаляем темную
      root.classList.add("light-mode");
      root.classList.remove("dark-mode");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  const toggleTheme = () => {
    // Переключение темы
    setDarkMode((prev) => !prev);
  };

  return (
    <ThemeContext.Provider value={{ darkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

// Хук для доступа к контексту
export function useTheme() {
  return useContext(ThemeContext);
}
