import { useEffect, useState } from "react";
import { MoodSelector } from "../MoodSelector/MoodSelector";
import { MoodCalendar } from "../MoodCalendar/MoodCalendar";
import "./MoodApp.css";

export function MoodApp() {
  const [moodByDate, setMoodByDate] = useState<Record<string, string>>({});

  useEffect(() => {
    const storedMoods: Record<string, string> = {};
    Object.keys(localStorage).forEach((key) => {
      if (/^\d{4}-\d{2}-\d{2}$/.test(key)) {
        storedMoods[key] = localStorage.getItem(key) || "";
      }
    });
    setMoodByDate(storedMoods);
  }, []);

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Mood Tracker</h1>
        <p>Exprime ton humeur et visualise ton bien-être</p>
      </header>

      <main className="main-content">
        <section className="card mood-selector-section">
          <MoodSelector moodByDate={moodByDate} setMoodByDate={setMoodByDate} />
        </section>

        <section className="card mood-calendar-section">
          <MoodCalendar moodByDate={moodByDate} setMoodByDate={setMoodByDate} />
        </section>
      </main>

      <footer className="app-footer text-align: center">
        <p>2025 Lucas Matusiak — Mood Tracker personnel</p>
      </footer>
    </div>
  );
}
