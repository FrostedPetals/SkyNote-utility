import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Themeprovider } from './components/Themeprovider.jsx'
import PomodoroContext from './components/PomodoroContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Themeprovider>
      <PomodoroContext>
          <App />
      </PomodoroContext>      
    </Themeprovider>    
  </StrictMode>,
)
