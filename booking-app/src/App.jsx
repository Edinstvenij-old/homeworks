import { Route, Routes } from "react-router-dom";
import Main from "./pages/Main";
import About from "./pages/About";
import Hotels from "./pages/Hotels";
import HotelDetails from "./pages/HotelDetails";
import NotFound from "./pages/NotFound";
import Layout from "./components/Layout"; // Импортируем Layout

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <Layout>
            <Main />
          </Layout>
        }
      />
      <Route
        path="/about"
        element={
          <Layout>
            <About />
          </Layout>
        }
      />
      <Route
        path="/hotels"
        element={
          <Layout>
            <Hotels />
          </Layout>
        }
      />
      <Route
        path="/hotels/:id"
        element={
          <Layout>
            <HotelDetails />
          </Layout>
        }
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
