import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

// Routing and pages will be added in task 3.2 (auth guard).
// For now this is a minimal entry point so the project builds.
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <div>Sistema Colaborativo UNSA</div>
  </StrictMode>,
)
