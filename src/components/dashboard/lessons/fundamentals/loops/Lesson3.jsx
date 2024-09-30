import React, { useState } from 'react'
import { DndProvider, useDrag, useDrop } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { motion } from 'framer-motion' // Import framer-motion for animations

const Lesson3 = () => {
  const [loopIndex, setLoopIndex] = useState(0)
  const [isRunning, setIsRunning] = useState(false)
  const [iterations, setIterations] = useState(3) // Set number of steps (3 tasks)
  const [operation, setOperation] = useState('')
  const [operand1, setOperand1] = useState(null)
  const [operand2, setOperand2] = useState(null)
  const [feedback, setFeedback] = useState('') // Feedback for the user
  const [variableValues, setVariableValues] = useState({ x: 0, y: 0, z: 0 }) // Store values of variables
  const [userResult, setUserResult] = useState(null) // User's calculated result

  const tasks = [
    { targetVariable: 'x', operation: '3 + 5', targetResult: 8 }, // Task 1
    { targetVariable: 'y', operation: 'x * 2', targetResult: 16 }, // Task 2
    { targetVariable: 'z', operation: 'y - 4', targetResult: 12 }, // Task 3
  ]

  const operations = ['+', '-', '*', '/']
  const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
  const variables = Object.keys(variableValues)

  // Number component
  const NumberItem = ({ number }) => {
    const [, drag] = useDrag(() => ({
      type: 'operand',
      item: { value: number },
    }))
    return (
      <div ref={drag} className='p-2 m-2 bg-green-300 rounded'>
        {number}
      </div>
    )
  }

  // Variable component (dragable)
  const VariableItem = ({ variable }) => {
    const [, drag] = useDrag(() => ({
      type: 'operand',
      item: { value: variableValues[variable] },
    }))
    return (
      <div ref={drag} className='p-2 m-2 bg-blue-300 rounded'>
        {variable} ({variableValues[variable]})
      </div>
    )
  }

  // Operator component
  const OperationItem = ({ operator }) => {
    const [, drag] = useDrag(() => ({
      type: 'operator',
      item: { operator },
    }))
    return (
      <div ref={drag} className='p-2 m-2 bg-yellow-300 rounded'>
        {operator}
      </div>
    )
  }

  // Operand drop zone 1
  const OperandDropZone1 = () => {
    const [{ isOver }, drop] = useDrop({
      accept: 'operand',
      drop: (item) => setOperand1(item.value),
      collect: (monitor) => ({
        isOver: !!monitor.isOver(),
      }),
    })
    return (
      <div
        ref={drop}
        className={`p-4 border-dashed border-2 ${
          isOver ? 'bg-gray-200' : 'bg-white'
        }`}
      >
        {operand1 !== null
          ? `Operand 1: ${operand1}`
          : 'Drag the first number or variable here'}
      </div>
    )
  }

  // Operand drop zone 2
  const OperandDropZone2 = () => {
    const [{ isOver }, drop] = useDrop({
      accept: 'operand',
      drop: (item) => setOperand2(item.value),
      collect: (monitor) => ({
        isOver: !!monitor.isOver(),
      }),
    })
    return (
      <div
        ref={drop}
        className={`p-4 border-dashed border-2 ${
          isOver ? 'bg-gray-200' : 'bg-white'
        }`}
      >
        {operand2 !== null
          ? `Operand 2: ${operand2}`
          : 'Drag the second number or variable here'}
      </div>
    )
  }

  // Operator drop zone
  const OperationDropZone = () => {
    const [{ isOver }, drop] = useDrop({
      accept: 'operator',
      drop: (item) => setOperation(item.operator),
      collect: (monitor) => ({
        isOver: !!monitor.isOver(),
      }),
    })
    return (
      <div
        ref={drop}
        className={`p-4 border-dashed border-2 ${
          isOver ? 'bg-gray-200' : 'bg-white'
        }`}
      >
        {operation ? `Operation: ${operation}` : 'Drag an operator here'}
      </div>
    )
  }

  const handleStart = () => {
    setIsRunning(true)
    setFeedback('')
    setLoopIndex(0) // Start at the first task
    setVariableValues({ x: 0, y: 0, z: 0 }) // Reset variables
    setUserResult(null) // Reset user result
  }

  const handleEvaluate = () => {
    const currentTask = tasks[loopIndex]
    let calculatedResult

    if (operation && operand1 !== null && operand2 !== null) {
      switch (operation) {
        case '+':
          calculatedResult = operand1 + operand2
          break
        case '-':
          calculatedResult = operand1 - operand2
          break
        case '*':
          calculatedResult = operand1 * operand2
          break
        case '/':
          calculatedResult = operand1 / operand2
          break
        default:
          return
      }
      setUserResult(calculatedResult)

      if (calculatedResult === currentTask.targetResult) {
        setFeedback('Correct!')
        setVariableValues((prev) => ({
          ...prev,
          [currentTask.targetVariable]: calculatedResult,
        }))
        setLoopIndex(loopIndex + 1)
        setOperation('')
        setOperand1(null)
        setOperand2(null)
      } else {
        setFeedback(
          `Incorrect! You calculated ${calculatedResult}, but the correct result is ${currentTask.targetResult}`
        )
      }
    } else {
      setFeedback(
        'Please complete the task by dragging both operands and an operation.'
      )
    }
  }

  const handleReset = () => {
    setIsRunning(false)
    setLoopIndex(0)
    setFeedback('')
    setUserResult(null)
    setVariableValues({ x: 0, y: 0, z: 0 })
  }

  // Render progress as numbered steps with animation
  const renderProgress = () => {
    return (
      <div className='flex space-x-4 justify-center mb-8'>
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
            {index + 1}
          </motion.div>
        ))}
      </div>
    )
  }

  return (
    <DndProvider backend={HTML5Backend}>
      <div className='p-6 max-w-4xl mx-auto'>
        <h1 className='text-3xl font-bold mb-6 text-center'>
          Task-Based Loop with Variables and Progress
        </h1>
        <p className='text-lg mb-4'>
          Complete each task by assigning the correct result to the specified
          variable using drag and drop.
        </p>

        {/* Render animated progress circles */}
        {renderProgress()}

        <div className='mb-8'>
          {isRunning && loopIndex < iterations ? (
            <div className='flex  items-center space-y-4'>
              <p>
                Step {loopIndex + 1}: {tasks[loopIndex].operation}
              </p>
              <OperandDropZone1 />
              <OperandDropZone2 />
              <OperationDropZone />
              <button
                onClick={handleEvaluate}
                className='bg-blue-500 text-white p-2 rounded-lg mt-4'
              >
                Evaluate
              </button>
              <p>{feedback}</p>
            </div>
          ) : isRunning && loopIndex === iterations ? (
            <div>
              <h2 className='text-2xl font-bold mb-4'>Congratulations!</h2>
              <p className='text-lg'>
                You've completed all tasks and successfully assigned the
                variables!
              </p>
              <button
                onClick={handleReset}
                className='bg-blue-500 text-white p-2 rounded-lg mt-4'
              >
                Restart
              </button>
            </div>
          ) : (
            <button
              onClick={handleStart}
              className='bg-green-500 text-white p-4 rounded-lg'
            >
              Start Loop
            </button>
          )}
        </div>

        <div className='grid grid-cols-2 gap-4'>
          <div>
            <h3 className='text-lg font-bold mb-2'>Numbers</h3>
            <div className='flex flex-wrap'>
              {numbers.map((num) => (
                <NumberItem key={num} number={num} />
              ))}
            </div>
          </div>

          <div>
            <h3 className='text-lg font-bold mb-2'>Variables</h3>
            <div className='flex flex-wrap'>
              {variables.map((variable) => (
                <VariableItem key={variable} variable={variable} />
              ))}
            </div>
          </div>

          <div>
            <h3 className='text-lg font-bold mb-2'>Operations</h3>
            <div className='flex flex-wrap'>
              {operations.map((operator) => (
                <OperationItem key={operator} operator={operator} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </DndProvider>
  )
}

export default Lesson3
