import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import ThemeSwitcher from "./components/ThemeSwitcher";
import ErrorBoundary from "./components/ErrorBoundary";
import Home from "./pages/Home";
import About from "./pages/About";
import Contacts from "./pages/Contacts";
import { ThemeProvider } from "./context/ThemeContext";

function App() {
  return (
    <ThemeProvider>
      <Router>
        <Header />
        <ThemeSwitcher />
        <div className="container">
          <ErrorBoundary>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/contacts" element={<Contacts />} />
            </Routes>
          </ErrorBoundary>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
