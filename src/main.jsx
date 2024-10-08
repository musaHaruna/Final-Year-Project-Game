import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { ProgressProvider } from './context/ProgressContext.jsx'
import { LessonProvider } from './context/LessonContext.jsx'
import { PointsProvider } from './context/PontsProvider.jsx'
ReactDOM.createRoot(document.getElementById('root')).render(
  <LessonProvider>
    <PointsProvider>
      <ProgressProvider>
        <DndProvider backend={HTML5Backend}>
          <React.StrictMode>
            <App />
          </React.StrictMode>
        </DndProvider>
      </ProgressProvider>
    </PointsProvider>
  </LessonProvider>
)
