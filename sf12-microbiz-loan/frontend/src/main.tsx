import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import SF11App from './SF11App'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <SF11App />
  </StrictMode>,
)
