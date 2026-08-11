import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./style.scss";
// 1. Import BrowserRouter
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/* 2. Wrap your App component inside the Router */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
);
