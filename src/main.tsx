import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
    <h1 className='text-blue-600'>bye</h1>
  </StrictMode>,
)
