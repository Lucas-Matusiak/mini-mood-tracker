import { useEffect, useState } from "react";
import { MoodSelector } from "../MoodSelector/MoodSelector";
import { MoodCalendar } from "../MoodCalendar/MoodCalendar";
import { MoodChart } from "../MoodChart/MoodChart";
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

      <main className="app-container">
        <section className="mood-main-panel">
          <MoodSelector moodByDate={moodByDate} setMoodByDate={setMoodByDate} />
          <MoodCalendar moodByDate={moodByDate} setMoodByDate={setMoodByDate} />
        </section>

        <aside className="mood-insights-panel">
          <h2>Indicateurs</h2>
          <MoodChart moodByDate={moodByDate} />
        </aside>
      </main>

      <footer className="app-footer text-align: center">
        <p>2025 Lucas Matusiak — Mood Tracker personnel</p>
      </footer>
    </div>
  );
}
