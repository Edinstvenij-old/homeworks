import { Route, Routes } from "react-router-dom";
import Main from "./pages/Main";
import About from "./pages/About";
import Hotels from "./pages/Hotels";
import HotelDetails from "./pages/HotelDetails";
import NotFound from "./pages/NotFound";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Box, Container } from "@mui/material";

function App() {
  return (
    <Box display="flex" flexDirection="column" minHeight="100vh">
      <Header />
      <Box component="main" flexGrow={1}>
        <Container maxWidth="lg">
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/about" element={<About />} />
            <Route path="/hotels" element={<Hotels />} />
            <Route path="/hotels/:id" element={<HotelDetails />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Container>
      </Box>
      <Footer />
    </Box>
  );
}

export default App;
