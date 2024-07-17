import React from 'react'
import './ProgressButton.css' // Import the CSS file
import InnerButton from './InnerButton'

const ProgressButton = ({
  text = 'START',
  buttonColor = '#84cc16',
  textColor = '#4d7c0f',
  progress = 0,
  onClick,
}) => {
  // Determine the button text based on progress
  const buttonText =
    progress === 0 ? '' : progress === 100 ? 'REPEAT LESSON' : text

  return (
    <div className='progress-button-container'>
      {progress !== 0 && (
        <button
          className='progress-button bounce'
          style={{ backgroundColor: buttonColor, color: textColor }}
          onClick={onClick}
        >
          {buttonText}
        </button>
      )}
      <div className='progress-ring'>
        <div className='inner-button'>
          <InnerButton
            text='CHECK'
            bgColor='bg-green-500'
            textColor='text-white'
            shadowColor='shadow-green-500/50'
            icon='solar:star-bold'
            onClick={() => alert('Button clicked!')}
            innerProgress={progress}
          />
        </div>

        {progress !== 0 && (
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
        )}
      </div>
    </div>
  )
}

export default ProgressButton
