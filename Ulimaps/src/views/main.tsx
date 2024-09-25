import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import Welcome from './welcome.tsx'
import '../styles/index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    
    <Welcome />
  </StrictMode>,
  //<App />
)
