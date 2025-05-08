import { Routes, Route } from "react-router-dom";
import Main from "../pages/Main";
import About from "../pages/About";
import Hotels from "../pages/Hotels";

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/about" element={<About />} />
      <Route path="/hotels" element={<Hotels />} />
    </Routes>
  );
}
