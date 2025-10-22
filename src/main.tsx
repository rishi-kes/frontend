import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css"; // 🌈 Tailwind & global theme variables
import App from "./App"; // ✅ Main App with all routes
import { ThemeProvider } from "./context/ThemeContext"; // 🌙 Dark Mode Context Provider

// 🧠 Create root & render
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    {/* ✅ Wrap app with theme context for dark/light toggle */}
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
