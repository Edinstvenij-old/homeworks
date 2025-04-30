import React from "react";
import ReactDOM from "react-dom/client"; // Обратите внимание на новый импорт
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import { CssBaseline } from "@mui/material";

// Используем createRoot для React 18
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Router>
    <CssBaseline />
    <App />
  </Router>
);
