import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { MoodApp } from "./components/MoodApp/MoodApp.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <MoodApp />
  </StrictMode>
);
