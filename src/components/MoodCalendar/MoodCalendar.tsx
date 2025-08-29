import { useState } from "react";
import Calendar, { type CalendarProps } from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./MoodCalendar.css";
import { EmojiPicker } from "../EmojiPicker/EmojiPicker";

interface MoodCalendarProps {
  moodByDate: Record<string, string>;
  setMoodByDate: React.Dispatch<React.SetStateAction<Record<string, string>>>;
}
export function MoodCalendar({ moodByDate, setMoodByDate }: MoodCalendarProps) {
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
      const local = selectedDate.toLocaleDateString("fr-CA");
      localStorage.setItem(local, emoji);
      setMoodByDate((prev) => ({ ...prev, [local]: emoji }));
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
        maxDate={new Date()}
        tileContent={({ date, view }) => {
          const local = date.toLocaleDateString("fr-CA");
          const mood = moodByDate[local];
          return view === "month" ? (
            <h3 className="emoji">{mood || "\u00A0"}</h3>
          ) : null;
        }}
        calendarType="iso8601" // Lundi comme premier jour
        locale="fr-FR"
        aria-label="day"
      />
    </div>
  );
}
