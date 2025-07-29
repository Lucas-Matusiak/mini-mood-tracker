import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { MoodSelector } from "./components/MoodSelector/MoodSelector.tsx";
import { MoodCalendar } from "./components/MoodCalendar/MoodCalendar.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <MoodSelector />
    <MoodCalendar />
  </StrictMode>
);
