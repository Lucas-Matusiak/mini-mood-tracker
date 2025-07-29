import { useState } from "react";
import Calendar, { type CalendarProps } from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./MoodCalendar.css";
import { EmojiPicker } from "../EmojiPicker/EmojiPicker";

export function MoodCalendar() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [showPicker, setShowPicker] = useState<boolean | null>(false);

  const handleDateChange: CalendarProps["onChange"] = (value) => {
    if (value instanceof Date) {
      setSelectedDate(value);
      setShowPicker(true);
    }
  };
  const handleEmojiSelect = (emoji: string) => {
    if (selectedDate) {
      const iso = selectedDate.toISOString().split("T")[0];
      localStorage.setItem(iso, emoji);
      setShowPicker(false);
    }
  };

  return (
    <div className="calendar-container">
      <h2>Historique de tes humeurs</h2>
      {showPicker && selectedDate && (
        <EmojiPicker
          date={selectedDate}
          onSelect={handleEmojiSelect}
          onClose={() => setShowPicker(false)}
        />
      )}
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
