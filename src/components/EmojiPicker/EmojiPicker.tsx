import "./EmojiPicker.css";

type EmojiPickerProps = {
  date: Date;
  onSelect: (emoji: string) => void;
  onClose: () => void;
};

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

export function EmojiPicker({ date, onSelect, onClose }: EmojiPickerProps) {
  return (
    <div className="emoji-modal">
      <div className="emoji-modal-content">
        <h3>
          Quelle est ton humeur pour le {date.toLocaleDateString("fr-FR")} ?
        </h3>
        <div className="emoji-scroll-container">
          {moods.map(({ emoji, label }) => (
            <button
              key={emoji}
              onClick={() => onSelect(emoji)}
              className="emoji-option rounded"
              aria-label={label}
            >
              <div className="emoji">{emoji}</div>
              <div className="emoji-label">{label}</div>
            </button>
          ))}
        </div>
        <button className="close-btn" onClick={onClose}>
          Annuler
        </button>
      </div>
    </div>
  );
}
