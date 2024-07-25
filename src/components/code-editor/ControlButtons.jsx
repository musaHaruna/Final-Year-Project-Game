import React from 'react'

const ControlButtons = ({
  handleReset,
  handleUndo,
  handlePlay,
  handleCheckStep,
}) => (
  <div className='flex space-x-4 mt-4'>
    <button
      onClick={handleReset}
      className='px-4 py-2 bg-gray-500 text-white rounded-md'
    >
      RESET
    </button>
    <button
      onClick={handleUndo}
      className='px-4 py-2 bg-yellow-500 text-white rounded-md'
    >
      UNDO
    </button>
    <button
      onClick={handlePlay}
      className='px-4 py-2 bg-blue-500 text-white rounded-md'
    >
      PLAY
    </button>
    <button
      onClick={handleCheckStep}
      className='px-4 py-2 bg-green-500 text-white rounded-md'
    >
      CHECK STEP
    </button>
  </div>
)

export default ControlButtons
