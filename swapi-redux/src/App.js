import React from "react";
import { Routes, Route, useMatch } from "react-router-dom";
import PeopleList from "./components/PeopleList";
import PersonDetail from "./components/PersonDetail";
import Footer from "./components/Footer";

const App = () => {
  const isDetailPage = useMatch("/person/:personId");

  return (
    <div className="app-container">
      <Routes>
        <Route path="/" element={<PeopleList />} />
        <Route path="/person/:personId" element={<PersonDetail />} />
      </Routes>

      {!isDetailPage && <Footer />}
    </div>
  );
};

export default App;
