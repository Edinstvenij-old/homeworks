import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import About from "./pages/About";
import Hotels from "./pages/Hotels";
import HotelDetail from "./pages/HotelDetail"; // Страница с деталями отеля

export default function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/hotels" element={<Hotels />} />
        <Route path="/hotels/:hotelId" element={<HotelDetail />} />
      </Routes>
    </>
  );
}
