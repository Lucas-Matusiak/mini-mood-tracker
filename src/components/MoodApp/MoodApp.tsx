import { useEffect, useState } from 'react'
import { MoodSelector } from '../MoodSelector/MoodSelector'
import { MoodCalendar } from '../MoodCalendar/MoodCalendar'

export function MoodApp() {
  const [moodByDate, setMoodByDate] = useState<Record<string, string>>({})

  // Charger les humeurs depuis localStorage une seule fois
  useEffect(() => {
    const storedMoods: Record<string, string> = {}
    Object.keys(localStorage).forEach((key) => {
      if (/^\d{4}-\d{2}-\d{2}$/.test(key)) {
        storedMoods[key] = localStorage.getItem(key) || ''
      }
    })
    setMoodByDate(storedMoods)
  }, [])

  return (
    <div>
      <MoodSelector moodByDate={moodByDate} setMoodByDate={setMoodByDate} />
      <MoodCalendar moodByDate={moodByDate} setMoodByDate={setMoodByDate} />
    </div>
  )
}
