import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { MoodSelector } from './components/MoodSelector/MoodSelector.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MoodSelector />
  </StrictMode>,
)
