import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Todo from "./pages/Todo";
import Swapi from "./pages/Swapi";
import { Box, GlobalStyles } from "@mui/material";

const App = () => (
  <>
    <GlobalStyles
      styles={{
        body: {
          margin: 0,
          padding: 0,
          fontFamily: "Roboto, sans-serif",
        },
        "#app-background": {
          backgroundImage: 'url("/images/7777.jpg")',
          backgroundSize: "cover",
          backgroundRepeat: "repeat",
          backgroundPosition: "0 0",
          animation: "moveBackground 60s linear infinite",
        },
        "@keyframes moveBackground": {
          from: { backgroundPosition: "0 0" },
          to: { backgroundPosition: "1000px 1000px" },
        },
      }}
    />

    <Box
      id="app-background"
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Header />
      <Box sx={{ flex: 1 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/todo" element={<Todo />} />
          <Route path="/swapi" element={<Swapi />} />
        </Routes>
      </Box>
      <Footer />
    </Box>
  </>
);

export default App;
