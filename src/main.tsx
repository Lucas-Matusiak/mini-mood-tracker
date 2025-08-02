import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./main.css";
import { MoodApp } from "./components/MoodApp/MoodApp.tsx";
import "../styles/styles.css"
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <MoodApp />
  </StrictMode>
);
