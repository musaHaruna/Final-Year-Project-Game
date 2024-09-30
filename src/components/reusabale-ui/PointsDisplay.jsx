import React from 'react'
import { usePoints } from '../../context/PontsProvider' // Import the usePoints hook

const PointsDisplay = () => {
  const { points } = usePoints()

  return (
    <div className='points-display-container bg-blue-200 p-2 mb-4 rounded-md shadow-lg'>
      <p className='text-lg text-center font-semibold'>Points: {points}</p>
    </div>
  )
}

export default PointsDisplay
