import './MoodConfirmation.css'

type MoodConfirmationProps = {
  emoji: string
  label: string
  onEdit?: () => void
}

export function MoodConfirmation({ emoji, label, onEdit }: MoodConfirmationProps) {
  return (
    <div className="confirmation-wrapper">
      <div className="checkmark-circle">
        <svg className="checkmark" viewBox="0 0 52 52">
          <path className="checkmark-check" fill="none" d="M14 27l8 8 16-16" />
        </svg>
      </div>
      <h3>Humeur enregistrée !</h3>
      <p>
        Aujourd’hui tu te sens : <span className="confirmation-label ">{emoji} {label}</span>
      </p>
      {onEdit && (
        <button className="edit-btn" onClick={onEdit}>
          Modifier l’humeur
        </button>
      )}
    </div>
  )
}
