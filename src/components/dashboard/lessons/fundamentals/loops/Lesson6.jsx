import React, { useState } from 'react'
import { motion } from 'framer-motion'

const Lesson6 = () => {
  const [loopStart, setLoopStart] = useState(1)
  const [loopEnd, setLoopEnd] = useState(5)
  const [currentIteration, setCurrentIteration] = useState(null)
  const [isRunning, setIsRunning] = useState(false)
  const [loopVariable, setLoopVariable] = useState('i')
  const [result, setResult] = useState(0)
  const [isFinished, setIsFinished] = useState(false)
  const [a, setA] = useState(2)
  const [b, setB] = useState(3)
  const [c, setC] = useState(1)

  const handleStart = () => {
    setIsRunning(true)
    setIsFinished(false)
    setCurrentIteration(loopStart)
    setResult(0)
    runLoop()
  }

  const runLoop = () => {
    let i = loopStart
    let currentResult = 0
    const interval = setInterval(() => {
      if (i <= loopEnd) {
        const iterationResult = a * i * i + b * i + c
        currentResult += iterationResult
        setCurrentIteration(i)
        setResult(currentResult)
        i++
      } else {
        clearInterval(interval)
        setIsRunning(false)
        setCurrentIteration(null)
        setIsFinished(true)
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
        Interactive For Loop with Complex Task
      </h1>

      <div className='mb-6'>
        <h2 className='text-2xl font-semibold mb-2'>
          Task: Calculate Polynomial Sum
        </h2>
        <p className='mb-4'>
          In this example, we'll use a for loop to calculate the sum of a
          polynomial expression for each value of the loop variable. The
          polynomial is of the form ax² + bx + c.
        </p>
        <CodeBlock>{`result = 0
FOR ${loopVariable} FROM ${loopStart} TO ${loopEnd}
    term = ${a} * ${loopVariable}² + ${b} * ${loopVariable} + ${c}
    result = result + term
    PRINT result
ENDFOR
PRINT "Final result: " + result`}</CodeBlock>
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
          <label>
            a:
            <input
              type='number'
              value={a}
              onChange={(e) => setA(parseInt(e.target.value))}
              className='ml-2 p-1 border rounded w-16'
            />
          </label>
          <label>
            b:
            <input
              type='number'
              value={b}
              onChange={(e) => setB(parseInt(e.target.value))}
              className='ml-2 p-1 border rounded w-16'
            />
          </label>
          <label>
            c:
            <input
              type='number'
              value={c}
              onChange={(e) => setC(parseInt(e.target.value))}
              className='ml-2 p-1 border rounded w-16'
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

        <div className='flex flex-wrap justify-center gap-2 mb-4'>
          {Array.from({ length: loopEnd - loopStart + 1 }).map((_, index) => (
            <motion.div
              key={index}
              className={`w-24 h-24 rounded-lg flex flex-col items-center justify-center text-sm font-bold ${
                index + loopStart === currentIteration
                  ? 'bg-green-500 text-white'
                  : 'bg-gray-200'
              }`}
              animate={{
                scale: index + loopStart === currentIteration ? 1.2 : 1,
                transition: { duration: 0.3 },
              }}
            >
              <div>
                {loopVariable} = {index + loopStart}
              </div>
              <div>
                Term:{' '}
                {index + loopStart === currentIteration
                  ? a * (index + loopStart) * (index + loopStart) +
                    b * (index + loopStart) +
                    c
                  : ''}
              </div>
              <div>
                Sum: {index + loopStart === currentIteration ? result : ''}
              </div>
            </motion.div>
          ))}
        </div>

        {isFinished && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className='bg-blue-100 p-4 rounded-lg text-center text-xl font-bold'
          >
            Final Result: {result}
          </motion.div>
        )}
      </div>

      <div className='mt-6'>
        <h2 className='text-2xl font-semibold mb-2'>Explanation</h2>
        <ul className='list-disc pl-6'>
          <li>
            The loop starts at {loopVariable} = {loopStart}
          </li>
          <li>
            It continues as long as {loopVariable} is less than or equal to{' '}
            {loopEnd}
          </li>
          <li>After each iteration, {loopVariable} is incremented by 1</li>
          <li>
            In each iteration, we calculate {a}
            {loopVariable}² + {b}
            {loopVariable} + {c}
          </li>
          <li>We add this result to our running total</li>
          <li>The loop runs {loopEnd - loopStart + 1} times</li>
          <li>
            The final sum of all these calculations is displayed at the end
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Lesson6
