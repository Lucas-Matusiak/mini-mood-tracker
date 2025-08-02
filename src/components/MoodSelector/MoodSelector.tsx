import { useState } from "react";
import "./MoodSelector.css";
import { MoodConfirmation } from "../MoodConfirmation/MoodConfirmation";

const moods = [
  { emoji: "😊", label: "Heureux" },
  { emoji: "😐", label: "Neutre" },
  { emoji: "😡", label: "En colère" },
  { emoji: "😴", label: "Fatigué" },
  { emoji: "😢", label: "Triste" },
  { emoji: "😟", label: "Inquiet" },
  { emoji: "😌", label: "Apaisé" },
  { emoji: "❓", label: "Inconnue" },
];

type MoodSelectorProps = {
  moodByDate: Record<string, string>;
  setMoodByDate: React.Dispatch<React.SetStateAction<Record<string, string>>>;
};

export function MoodSelector({ setMoodByDate }: MoodSelectorProps) {
  const [selectedMood, setSelectedMood] = useState<{
    emoji: string;
    label: string;
  } | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleMoodClick = (mood: { emoji: string; label: string }) => {
    setSelectedMood(mood);
  };

  const handleSubmit = () => {
    if (selectedMood) {
      const date = new Date().toISOString().split("T")[0];
      localStorage.setItem(date, selectedMood.emoji);
      setMoodByDate((prev) => ({ ...prev, [date]: selectedMood.emoji }));
      setIsSubmitted(true);
    }
  };

  return (
    <div className="mood-selector">
      {isSubmitted && selectedMood ? (
        <MoodConfirmation
          emoji={selectedMood.emoji}
          label={selectedMood.label}
          onEdit={() => setIsSubmitted(false)}
        />
      ) : (
        <>
          <h2>Comment tu te sens aujourd'hui ?</h2>
          <h3>Choisis l'emoji qui correspond à ton ressenti</h3>
          <div className="mood-grid">
            {moods.map((mood) => (
              <button
                key={mood.emoji}
                onClick={() => handleMoodClick(mood)}
                className={`mood-card rounded ${
                  selectedMood?.emoji === mood.emoji ? "active" : ""
                }`}
                aria-label={mood.label}
              >
                <div className="mood-emoji">{mood.emoji}</div>
                <div className="mood-label">{mood.label}</div>
              </button>
            ))}
          </div>
          {selectedMood && (
            <button className="validate-btn btn" onClick={handleSubmit}>
              Valider l’humeur
            </button>
          )}
        </>
      )}
    </div>
  );
}
