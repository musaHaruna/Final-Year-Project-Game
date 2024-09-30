import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

const Lesson1 = () => {
  const [loopIndex, setLoopIndex] = useState(0)
  const [isRunning, setIsRunning] = useState(false)
  const [speed, setSpeed] = useState(1000) // milliseconds
  const [steps, setSteps] = useState(4)

  useEffect(() => {
    let interval
    if (isRunning) {
      interval = setInterval(() => {
        setLoopIndex((prevIndex) => (prevIndex + 1) % steps)
      }, speed)
    }
    return () => clearInterval(interval)
  }, [isRunning, speed, steps])

  const handleStart = () => setIsRunning(true)
  const handleStop = () => setIsRunning(false)
  const handleReset = () => {
    setIsRunning(false)
    setLoopIndex(0)
  }

  const handleSpeedChange = (e) => setSpeed(Number(e.target.value))
  const handleStepsChange = (e) => {
    const newSteps = Number(e.target.value)
    setSteps(newSteps)
    setLoopIndex(0)
  }

  return (
    <div className='p-6 max-w-4xl mx-auto'>
      <h1 className='text-3xl font-bold mb-6 text-center'>
        Loop Visualization
      </h1>
      <p className='text-lg mb-4'>
        This component visualizes how a loop works in programming. Each circle
        represents a step in the loop, and the highlighted circle shows the
        current step being executed.
      </p>

      <div className='mb-8'>
        <h2 className='text-2xl font-bold mb-4'>Loop Progress</h2>
        <div className='flex justify-center items-center space-x-4 mb-4'>
          {[...Array(steps)].map((_, index) => (
            <motion.div
              key={index}
              className={`w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold ${
                index === loopIndex ? 'bg-blue-500 text-white' : 'bg-gray-200'
              }`}
              animate={{
                scale: index === loopIndex ? 1.2 : 1,
                transition: { duration: 0.3 },
              }}
            >
              {index}
            </motion.div>
          ))}
        </div>
        <p className='text-center mt-4'>
          Current Step: {loopIndex} / {steps - 1}
        </p>
      </div>

      <div className='mb-8'>
        <h2 className='text-2xl font-bold mb-4'>Controls</h2>
        <div className='flex justify-center space-x-4 mb-4'>
          <button
            onClick={handleStart}
            className='bg-green-500 text-white p-2 rounded-lg'
            disabled={isRunning}
          >
            Start
          </button>
          <button
            onClick={handleStop}
            className='bg-red-500 text-white p-2 rounded-lg'
            disabled={!isRunning}
          >
            Stop
          </button>
          <button
            onClick={handleReset}
            className='bg-gray-500 text-white p-2 rounded-lg'
          >
            Reset
          </button>
        </div>
        <div className='flex flex-col items-center space-y-4'>
          <label className='flex items-center'>
            Speed (ms):
            <input
              type='range'
              min='100'
              max='2000'
              step='100'
              value={speed}
              onChange={handleSpeedChange}
              className='ml-4'
            />
            <span className='ml-2'>{speed}ms</span>
          </label>
          <label className='flex items-center'>
            Number of Steps:
            <input
              type='number'
              min='2'
              max='10'
              value={steps}
              onChange={handleStepsChange}
              className='ml-4 p-1 border rounded'
            />
          </label>
        </div>
      </div>

      <div className='mt-8'>
        <h2 className='text-2xl font-bold mb-4'>How It Works</h2>
        <ol className='list-decimal list-inside space-y-2'>
          <li>The circles represent steps in a loop, starting from index 0.</li>
          <li>
            The blue, enlarged circle shows the current step being executed.
          </li>
          <li>
            When you start the loop, it will move through each step
            sequentially.
          </li>
          <li>
            After reaching the last step, it loops back to the first step (index
            0).
          </li>
          <li>
            You can control the speed of the loop and the number of steps.
          </li>
          <li>
            This visualizes how computers execute repetitive tasks efficiently.
          </li>
        </ol>
      </div>
    </div>
  )
}

export default Lesson1
