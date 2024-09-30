import React, { useState } from 'react'
import { motion } from 'framer-motion'

const Lesson4 = () => {
  const [loopStart, setLoopStart] = useState(0)
  const [loopEnd, setLoopEnd] = useState(5)
  const [currentIteration, setCurrentIteration] = useState(null)
  const [isRunning, setIsRunning] = useState(false)
  const [loopVariable, setLoopVariable] = useState('i')

  const handleStart = () => {
    setIsRunning(true)
    setCurrentIteration(loopStart)
    runLoop()
  }

  const runLoop = () => {
    let i = loopStart
    const interval = setInterval(() => {
      if (i < loopEnd) {
        setCurrentIteration(i)
        i++
      } else {
        clearInterval(interval)
        setIsRunning(false)
        setCurrentIteration(null)
      }
    }, 1000)
  }

  const CodeBlock = ({ children }) => (
    <pre className='bg-gray-100 p-4 rounded-lg overflow-x-auto'>
      <code>{children}</code>
    </pre>
  )

  return (
    <div className='p-6 max-w-4xl mx-auto'>
      <h1 className='text-3xl font-bold mb-6 text-center'>
        Introduction to For Loops
      </h1>

      <div className='mb-6'>
        <h2 className='text-2xl font-semibold mb-2'>What is a For Loop?</h2>
        <p className='mb-4'>
          A for loop is a control flow statement that allows code to be executed
          repeatedly based on a given condition. It's particularly useful when
          you want to run a block of code a specific number of times.
        </p>
        <CodeBlock>{`FOR ${loopVariable} FROM ${loopStart} TO ${loopEnd - 1}
    // Code to be executed in each iteration
    PRINT ${loopVariable}
ENDFOR`}</CodeBlock>
      </div>

      <div className='mb-6'>
        <h2 className='text-2xl font-semibold mb-2'>Interactive Example</h2>
        <div className='flex flex-wrap items-center space-x-4 mb-4'>
          <label>
            Start value:
            <input
              type='number'
              value={loopStart}
              onChange={(e) => setLoopStart(parseInt(e.target.value))}
              className='ml-2 p-1 border rounded w-16'
            />
          </label>
          <label>
            End value:
            <input
              type='number'
              value={loopEnd}
              onChange={(e) => setLoopEnd(parseInt(e.target.value))}
              className='ml-2 p-1 border rounded w-16'
            />
          </label>
          <label>
            Loop variable:
            <input
              type='text'
              value={loopVariable}
              onChange={(e) => setLoopVariable(e.target.value)}
              className='ml-2 p-1 border rounded w-8'
              maxLength='1'
            />
          </label>
          <button
            onClick={handleStart}
            disabled={isRunning}
            className='bg-blue-500 text-white p-2 rounded disabled:bg-gray-400'
          >
            Run Loop
          </button>
        </div>

        <div className='flex flex-wrap justify-center gap-2'>
          {Array.from({ length: loopEnd - loopStart }).map((_, index) => (
            <motion.div
              key={index}
              className={`w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold ${
                index + loopStart === currentIteration
                  ? 'bg-green-500 text-white'
                  : 'bg-gray-200'
              }`}
              animate={{
                scale: index + loopStart === currentIteration ? 1.2 : 1,
                transition: { duration: 0.3 },
              }}
            >
              {index + loopStart}
            </motion.div>
          ))}
        </div>
      </div>

      <div className='mt-6'>
        <h2 className='text-2xl font-semibold mb-2'>Explanation</h2>
        <ul className='list-disc pl-6'>
          <li>
            The loop starts at {loopVariable} = {loopStart}
          </li>
          <li>
            It continues as long as {loopVariable} is less than {loopEnd}
          </li>
          <li>After each iteration, {loopVariable} is incremented by 1</li>
          <li>
            The loop body (represented by the green circle) is executed{' '}
            {loopEnd - loopStart} times
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Lesson4
