// src/App.js
import React from "react";
import { Routes, Route, useLocation } from "react-router-dom"; // Импортируем useLocation
import PeopleList from "./components/PeopleList";
import PersonDetail from "./components/PersonDetail";
import Footer from "./components/Footer";

const App = () => {
  const location = useLocation(); // Получаем текущий путь

  // Скрываем футер, если находимся на странице с подробной информацией
  const showFooter = location.pathname !== "/person/:personId";

  return (
    <div className="app-container">
      <Routes>
        <Route path="/" element={<PeopleList />} />
        <Route path="/person/:personId" element={<PersonDetail />} />
      </Routes>

      {/* Показываем футер только если не на странице подробной информации */}
      {showFooter && <Footer />}
    </div>
  );
};

export default App;
