// src/components/ProgressButton.js
import React from 'react'
import './ProgressButton.css' // Import the CSS file

const ProgressButton = ({
  text = 'START',
  buttonColor = '#84cc16',
  textColor = '#4d7c0f',
  icon,
  progress = 0,
  onClick,
}) => {
  return (
    <div className='progress-button-container'>
      <button
        className='progress-button bounce'
        style={{ backgroundColor: buttonColor, color: textColor }}
        onClick={onClick}
      >
        {icon && <span className='icon'>{icon}</span>}
        {text}
      </button>
      <div className='progress-ring'>
        <svg className='progress-circle' width='120' height='120'>
          <circle className='progress-bg' cx='60' cy='60' r='54' />
          <circle
            className='progress-bar'
            cx='60'
            cy='60'
            r='54'
            style={{
              strokeDashoffset: `calc(339.292 - (339.292 * ${progress}) / 100)`,
            }}
          />
        </svg>
      </div>
    </div>
  )
}

export default ProgressButton
