import { useEffect, useState } from "react";
import { MoodSelector } from "../MoodSelector/MoodSelector";
import { MoodCalendar } from "../MoodCalendar/MoodCalendar";
import { MoodChart } from "../MoodChart/MoodChart";
import { MoodStats } from "../MoodStats/MoodStats";
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
    <div className="app-root">
      <header className="app-header">
        <div className="header-inner">
          <h1>Mood Tracker</h1>
          <p>Exprime ton humeur et visualise ton bien-être</p>
        </div>
      </header>

      <main className="main-grid">
        {/* colonne gauche : selector + calendar (scrollable si contenu trop grand) */}
        <section className="left-column">
          <div className="card">
            <MoodSelector
              moodByDate={moodByDate}
              setMoodByDate={setMoodByDate}
            />
          </div>

          <div className="card">
            <MoodCalendar
              moodByDate={moodByDate}
              setMoodByDate={setMoodByDate}
            />
          </div>
        </section>

        <aside className="right-column" aria-label="indicators">
          <div className="insights-wrapper">
            {/* carte pour le graphique */}
            <div className="card insights-chart-card">
              <MoodChart moodByDate={moodByDate} />
            </div>

            {/* carte pour le top 3 */}
            <div className="card insights-stats-card">
              <MoodStats moodByDate={moodByDate} />
            </div>
          </div>
        </aside>
      </main>

      <footer className="app-footer">
        <p>2025 Lucas Matusiak — Mood Tracker</p>
        <p>Projet personnel sans but lucratif</p>
      </footer>
    </div>
  );
}
