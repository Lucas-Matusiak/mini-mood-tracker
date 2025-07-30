import { useState } from "react";
import "./MoodSelector.css";

interface MoodSelectorProps {
  moodByDate: Record<string, string>;
  setMoodByDate: React.Dispatch<React.SetStateAction<Record<string, string>>>;
}

const moods = [
  { emoji: "😊", label: "Heureux" },
  { emoji: "😐", label: "Neutre" },
  { emoji: "😡", label: "En colère" },
  { emoji: "😴", label: "Fatigué" },
  { emoji: "😢", label: "Triste" },
  { emoji: "😟", label: "Triste" },
  { emoji: "😌", label: "Apaisé" },
  { emoji: "❓", label: "?" },
];

export function MoodSelector({ moodByDate, setMoodByDate }: MoodSelectorProps) {
  const [selectedMood, setSelectedMood] = useState<string | null>(null);

  const handleMoodClick = (emoji: string) => {
    const today = new Date().toLocaleDateString("fr-CA");
    localStorage.setItem(today, emoji);
    setMoodByDate({ ...moodByDate, [today]: emoji });
    setSelectedMood(emoji);
  };

  return (
    <div className="mood-selector">
      <h2>Comment tu te sens aujourd'hui ?</h2>
      <h3>
        Choisis l'emoji qui correspond le mieux à ce que tu as ressenti durant
        cette journée
      </h3>
      <div className="mood-grid">
        {moods.map((mood) => (
          <button
            key={mood.emoji}
            onClick={() => handleMoodClick(mood.emoji)}
            className={`mood-card ${
              selectedMood === mood.emoji ? "active" : ""
            }`}
            aria-label={mood.label}
          >
            {mood.emoji}
          </button>
        ))}
      </div>
      {selectedMood && (
        <p className="confirmation">
          Ton humeur a été enregistrée : {selectedMood}
        </p>
      )}
    </div>
  );
}
