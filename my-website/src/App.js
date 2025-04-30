import React from "react";
import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Todo from "./pages/Todo";
import SWAPIPage from "./pages/SWAPIPage";

function App() {
  return (
    <div>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/todo" element={<Todo />} />
          <Route path="/swapi" element={<SWAPIPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
