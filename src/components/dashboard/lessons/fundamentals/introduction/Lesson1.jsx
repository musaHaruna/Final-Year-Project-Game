import React, { useState } from 'react'

const Lesson1 = () => {
  const [showHint, setShowHint] = useState(false)

  return (
    <div className='rounded-lg p-8 mb-8'>
      <h2 className='text-3xl font-bold mb-6 text-gray-700 text-center'>
        Welcome to Programming!
      </h2>
      <p className='text-lg mb-6 text-gray-800 leading-relaxed'>
        Programming is like giving instructions to a computer. It's a way to
        make computers do amazing things and turn your ideas into reality!
      </p>
      <p className='text-xl font-semibold text-blue-600 mb-2'>Your Task:</p>
      <p className='text-lg mb-6 text-gray-800'>
        Click 'Next' to continue your journey into the world of programming.
      </p>
      <button
        className='bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-full shadow-md transition duration-300 ease-in-out transform hover:scale-110 focus:outline-none focus:ring-4 focus:ring-blue-300'
        onClick={() => setShowHint(!showHint)}
      >
        {showHint ? 'Hide Hint' : 'Show Hint'}
      </button>

      {showHint && (
        <p className='text-md mt-4 text-blue-700 bg-blue-100 p-4 rounded-md shadow-inner'>
          Hint: Stay curious and don't hesitate to explore new concepts!
        </p>
      )}
    </div>
  )
}

export default Lesson1
