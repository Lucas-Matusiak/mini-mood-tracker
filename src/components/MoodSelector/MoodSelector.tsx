import { useState } from "react";
import "./MoodSelector.css";

const moods = [
  { emoji: "😊", label: "Heureux" },
  { emoji: "😐", label: "Neutre" },
  { emoji: "😡", label: "En colère" },
  { emoji: "😴", label: "Fatigué" },
  { emoji: "😢", label: "Triste" },
  { emoji: "😟", label: "Inquiet" },
  { emoji: "😌", label: "Apaisé" },
  { emoji: "❓", label: "?" },
];

type MoodSelectorProps = {
  moodByDate: Record<string, string>;
  setMoodByDate: React.Dispatch<React.SetStateAction<Record<string, string>>>;
};

export function MoodSelector({ moodByDate, setMoodByDate }: MoodSelectorProps) {
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
      {isSubmitted ? (
        <div className="confirmation-block clean">
          <div className="checkmark-wrapper">
            <div className="checkmark-circle">
              <svg className="checkmark" viewBox="0 0 52 52">
                <path
                  className="checkmark-check"
                  fill="none"
                  d="M14 27l8 8 16-16"
                />
              </svg>
            </div>
          </div>
          <h3>Humeur enregistrée !</h3>
          <p>
            Tu te sens{" "}
            <span className="mood-highlight">
              {selectedMood?.emoji} {selectedMood?.label}
            </span>{" "}
            aujourd’hui.
          </p>
        </div>
      ) : (
        <>
          <h2>Comment tu te sens aujourd'hui ?</h2>
          <h3>Choisis l'emoji qui correspond à ton ressenti</h3>
          <div className="mood-grid">
            {moods.map((mood) => (
              <button
                key={mood.emoji}
                onClick={() => handleMoodClick(mood)}
                className={`mood-card ${
                  selectedMood?.emoji === mood.emoji ? "active" : ""
                }`}
                aria-label={mood.label}
              >
                {mood.emoji}
              </button>
            ))}
          </div>
          {selectedMood && (
            <button className="validate-btn" onClick={handleSubmit}>
              Valider l’humeur
            </button>
          )}
        </>
      )}
    </div>
  );
}
