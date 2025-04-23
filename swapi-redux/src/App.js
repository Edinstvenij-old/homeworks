// src/App.js
import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import PeopleList from "./components/PeopleList";
import PersonDetail from "./components/PersonDetail";
import Footer from "./components/Footer";

const App = () => {
  const location = useLocation();

  // Скрываем футер на всех путях, начинающихся с /person/
  const showFooter = !location.pathname.startsWith("/person/");

  return (
    <div className="app-container">
      <Routes>
        <Route path="/" element={<PeopleList />} />
        <Route path="/person/:personId" element={<PersonDetail />} />
      </Routes>

      {showFooter && <Footer />}
    </div>
  );
};

export default App;
