import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

const Lesson2 = () => {
  const [loopIndex, setLoopIndex] = useState(0)
  const [isRunning, setIsRunning] = useState(false)
  const [speed, setSpeed] = useState(1000) // milliseconds
  const [iterations, setIterations] = useState(4)
  const [operation, setOperation] = useState('+')
  const [operand, setOperand] = useState(1)
  const [result, setResult] = useState(0)
  const [stepResults, setStepResults] = useState([])

  useEffect(() => {
    let interval
    if (isRunning) {
      interval = setInterval(() => {
        setLoopIndex((prevIndex) => {
          const newIndex = (prevIndex + 1) % iterations
          if (newIndex === 0 && prevIndex !== 0) {
            setIsRunning(false) // Stops after completing all iterations
          }
          return newIndex
        })
      }, speed)
    }
    return () => clearInterval(interval)
  }, [isRunning, speed, iterations])

  useEffect(() => {
    if (isRunning) {
      setResult((prevResult) => {
        let newResult
        switch (operation) {
          case '+':
            newResult = prevResult + operand
            break
          case '-':
            newResult = prevResult - operand
            break
          case '*':
            newResult = prevResult * operand
            break
          case '/':
            newResult = prevResult / operand
            break
          default:
            newResult = prevResult
        }
        setStepResults((prev) => {
          const updatedSteps = [...prev]
          updatedSteps[loopIndex] = newResult // Update stepResults based on zero-indexed loop
          return updatedSteps
        })
        return newResult
      })
    }
  }, [loopIndex, isRunning])

  const handleStart = () => {
    setIsRunning(true)
    setResult(0)
    setStepResults([]) // Reset the step results when starting
  }

  const handleStop = () => setIsRunning(false)
  const handleReset = () => {
    setIsRunning(false)
    setLoopIndex(0)
    setResult(0)
    setStepResults([])
  }

  const handleSpeedChange = (e) => setSpeed(Number(e.target.value))
  const handleIterationsChange = (e) => {
    const newIterations = Number(e.target.value)
    setIterations(newIterations)
    setLoopIndex(0)
    setStepResults([]) // Reset stepResults when iterations change
  }
  const handleOperationChange = (e) => setOperation(e.target.value)
  const handleOperandChange = (e) => setOperand(Number(e.target.value))

  return (
    <div className='p-6 max-w-4xl mx-auto'>
      <h1 className='text-3xl font-bold mb-6 text-center'>
        Interactive Loop Visualization
      </h1>
      <p className='text-lg mb-4'>
        This component simulates a programming loop. You can set the number of
        iterations, choose an arithmetic operation, and see how the result
        changes in each step.
      </p>

      <div className='mb-8'>
        <h2 className='text-2xl font-bold mb-4'>Loop Progress</h2>
        <div className='flex justify-center items-center space-x-4 mb-4'>
          {[...Array(iterations)].map((_, index) => (
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
              {stepResults[index] !== undefined ? stepResults[index] : index}{' '}
              {/* Start counting from 0 */}
            </motion.div>
          ))}
        </div>
        <p className='text-center mt-4'>
          Current Step: {loopIndex} / {iterations - 1}
        </p>
        <p className='text-center mt-2'>Current Result: {result}</p>
      </div>

      <div className='mb-8'>
        <h2 className='text-2xl font-bold mb-4'>Loop Configuration</h2>
        <div className='flex flex-col items-center space-y-4'>
          <label className='flex items-center'>
            Number of Iterations:
            <input
              type='number'
              min='2'
              max='10'
              value={iterations}
              onChange={handleIterationsChange}
              className='ml-4 p-1 border rounded'
            />
          </label>
          <label className='flex items-center'>
            Operation:
            <select
              value={operation}
              onChange={handleOperationChange}
              className='ml-4 p-1 border rounded'
            >
              <option value='+'>Addition (+)</option>
              <option value='-'>Subtraction (-)</option>
              <option value='*'>Multiplication (*)</option>
              <option value='/'>Division (/)</option>
            </select>
          </label>
          <label className='flex items-center'>
            Operand:
            <input
              type='number'
              value={operand}
              onChange={handleOperandChange}
              className='ml-4 p-1 border rounded'
            />
          </label>
        </div>
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
        </div>
      </div>

      <div className='mt-8'>
        <h2 className='text-2xl font-bold mb-4'>How It Works</h2>
        <ol className='list-decimal list-inside space-y-2'>
          <li>Set the number of iterations for your loop.</li>
          <li>Choose an arithmetic operation and an operand.</li>
          <li>Click 'Start' to run the loop.</li>
          <li>
            Watch as the loop executes, performing the chosen operation in each
            step.
          </li>
          <li>
            The result of each step is displayed in the corresponding circle.
          </li>
          <li>The loop stops automatically after completing all iterations.</li>
          <li>You can stop the loop at any time or reset it to start over.</li>
        </ol>
      </div>
    </div>
  )
}

export default Lesson2
