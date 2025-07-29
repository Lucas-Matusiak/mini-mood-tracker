import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./MoodCalendar.css";

export function MoodCalendar() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());

  const handleDateChange = (date: Date) => {
    setSelectedDate(date);
    const mood = prompt(
      `Quelle est ton humeur pour le ${date.toLocaleDateString(
        "fr-FR"
      )} ? (emoji)`
    );
    if (mood) {
      const iso = date.toISOString().split("T")[0];
      localStorage.setItem(iso, mood);
    }
  };

  return (
    <div className="calendar-container">
      <h2>Historique de tes humeurs</h2>

      <Calendar
        onChange={handleDateChange}
        value={selectedDate}
        tileContent={({ date, view }) => {
          const iso = date.toISOString().split("T")[0];
          const mood = localStorage.getItem(iso);
          return view === "month" && mood ? (
            <div className="emoji">{mood}</div>
          ) : null;
        }}
        calendarType="iso8601" // Lundi comme premier jour
        locale="fr-FR"
      />
    </div>
  );
}
