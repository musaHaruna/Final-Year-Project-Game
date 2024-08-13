import React, { useState } from 'react'
import { motion } from 'framer-motion'
import Lottie from 'react-lottie'
import successAnimation1 from '../../../../../assets/animations/encouragements/excellent.json'
import successAnimation2 from '../../../../../assets/animations/encouragements/good-job.json'
import successAnimation3 from '../../../../../assets/animations/encouragements/nice.json'
import tryAgainAnimation from '../../../../../assets/animations/encouragements/try-again.json'
import correctSound1 from '../../../../../assets/sounds/encouragement/bonus-points.mp3'
import correctSound2 from '../../../../../assets/sounds/encouragement/success.mp3'
import correctSound3 from '../../../../../assets/sounds/encouragement/yipee.mp3'
import wrongSound from '../../../../../assets/sounds/encouragement/error.mp3'
import dragSound from '../../../../../assets/sounds/generic/click.mp3'
import dropSound from '../../../../../assets/sounds/generic/drop.mp3'

const Lesson1 = () => {
  const [items, setItems] = useState({
    two: true,
    three: true,
    four: true,
  })
  const [operations, setOperations] = useState({
    addition: true,
    subtraction: true,
    multiplication: true,
    division: true,
  })
  const [expression, setExpression] = useState([])
  const [result, setResult] = useState(null)
  const [showAnimation, setShowAnimation] = useState(false)
  const [animationData, setAnimationData] = useState(null)
  const [showHint, setShowHint] = useState(false)
  const [message, setMessage] = useState('')
  const [taskIndex, setTaskIndex] = useState(0)

  const tasks = [
    { description: 'Task 1: Add two numbers (e.g., 2 + 2)', solution: 4 },
    {
      description:
        'Task 2: Add, subtract, multiply, and divide (e.g., 2 + 2 - 3 * 4 / 2)',
      solution: -2,
    },
  ]

  const successAnimations = [
    successAnimation1,
    successAnimation2,
    successAnimation3,
  ]

  const correctSounds = [correctSound1, correctSound2, correctSound3]

  const playSound = (sound) => {
    const audio = new Audio(sound)
    audio.play()
  }

  const onDragStart = (event, item) => {
    event.dataTransfer.setData('text/plain', item)
    event.currentTarget.style.cursor = 'grabbing'
    playSound(dragSound)
  }

  const onDragEnd = (event) => {
    event.currentTarget.style.cursor = 'grab'
  }

  const onDragOver = (event) => {
    event.preventDefault()
    event.currentTarget.style.cursor = 'pointer'
  }

  const onDrop = (event) => {
    const item = event.dataTransfer.getData('text/plain')
    playSound(dropSound)
    setExpression((prev) => [...prev, item])
    event.dataTransfer.clearData()
    event.currentTarget.style.cursor = 'default'
  }

  const evaluateExpression = () => {
    try {
      const parsedExpression = expression
        .map((item) => {
          if (item === 'two') return 2
          if (item === 'three') return 3
          if (item === 'four') return 4
          if (item === 'addition') return '+'
          if (item === 'subtraction') return '-'
          if (item === 'multiplication') return '*'
          if (item === 'division') return '/'
          return item
        })
        .join(' ')

      const result = eval(parsedExpression)
      setResult(result)
      if (result === tasks[taskIndex].solution) {
        setMessage(`Correct! The result is ${result}`)
        setAnimationData(
          successAnimations[
            Math.floor(Math.random() * successAnimations.length)
          ]
        )
        playSound(
          correctSounds[Math.floor(Math.random() * correctSounds.length)]
        )
        setShowHint(false)
        setTaskIndex((prevIndex) => (prevIndex + 1) % tasks.length)
        setExpression([])
      } else {
        throw new Error('Invalid expression')
      }
    } catch {
      setMessage('Invalid expression. Please try again.')
      setAnimationData(tryAgainAnimation)
      playSound(wrongSound)
      setShowHint(true)
    }
    setShowAnimation(true)
    setTimeout(() => setShowAnimation(false), 2000)
  }

  const undoLastAction = () => {
    setExpression((prev) => prev.slice(0, -1))
  }

  return (
    <div>
      <h1 className='text-3xl font-bold mb-6 text-center'>
        Arithmetic with Variables
      </h1>
      <p className='text-lg mb-4'>
        <span className='font-semibold'>Definition:</span> Variables can hold
        numbers and be used in arithmetic operations.
      </p>
      <p className='text-lg mb-4'>
        <span className='font-semibold'>Purpose:</span> Learn how to use
        variables to perform basic arithmetic operations.
      </p>
      <div className='mb-8'>
        <h2 className='text-1xl font-bold mb-2'>
          <span className='underline'>Mission:</span> Drag and drop the numbers
          and operations to create an expression, then evaluate it.
        </h2>
        <p>{tasks[taskIndex].description}</p>
      </div>
      <div
        onDragOver={onDragOver}
        onDrop={onDrop}
        className='w-full h-32 border-4 border-dashed flex flex-col items-center justify-center rounded-lg shadow-md mb-8'
        style={{ cursor: 'default' }}
      >
        <h2 className='text-xl font-semibold mb-2'>Expression</h2>
        <div className='flex'>
          {expression.map((item, index) => (
            <h1 key={index} className='text-4xl mx-2'>
              {item === 'addition'
                ? '+'
                : item === 'subtraction'
                ? '-'
                : item === 'multiplication'
                ? '*'
                : item === 'division'
                ? '/'
                : item === 'two'
                ? '2'
                : item === 'three'
                ? '3'
                : '4'}
            </h1>
          ))}
        </div>
      </div>
      <div className='flex justify-around mb-4'>
        {items.two && (
          <h1
            className='text-4xl cursor-grab'
            draggable='true'
            onDragStart={(event) => onDragStart(event, 'two')}
            onDragEnd={onDragEnd}
          >
            2
          </h1>
        )}
        {items.three && (
          <h1
            className='text-4xl cursor-grab'
            draggable='true'
            onDragStart={(event) => onDragStart(event, 'three')}
            onDragEnd={onDragEnd}
          >
            3
          </h1>
        )}
        {items.four && (
          <h1
            className='text-4xl cursor-grab'
            draggable='true'
            onDragStart={(event) => onDragStart(event, 'four')}
            onDragEnd={onDragEnd}
          >
            4
          </h1>
        )}
      </div>
      <div className='flex justify-around mb-4'>
        {operations.addition && (
          <h1
            className='text-4xl cursor-grab'
            draggable='true'
            onDragStart={(event) => onDragStart(event, 'addition')}
            onDragEnd={onDragEnd}
          >
            +
          </h1>
        )}
        {operations.subtraction && (
          <h1
            className='text-4xl cursor-grab'
            draggable='true'
            onDragStart={(event) => onDragStart(event, 'subtraction')}
            onDragEnd={onDragEnd}
          >
            -
          </h1>
        )}
        {operations.multiplication && (
          <h1
            className='text-4xl cursor-grab'
            draggable='true'
            onDragStart={(event) => onDragStart(event, 'multiplication')}
            onDragEnd={onDragEnd}
          >
            *
          </h1>
        )}
        {operations.division && (
          <h1
            className='text-4xl cursor-grab'
            draggable='true'
            onDragStart={(event) => onDragStart(event, 'division')}
            onDragEnd={onDragEnd}
          >
            /
          </h1>
        )}
      </div>
      <div className='flex justify-center space-x-4'>
        <button
          onClick={evaluateExpression}
          className='bg-blue-500 text-white p-4 rounded-lg mt-4'
        >
          Evaluate
        </button>
        <button
          onClick={undoLastAction}
          className='bg-gray-500 text-white p-4 rounded-lg mt-4'
        >
          Undo
        </button>
      </div>
      {result !== null && (
        <p className='text-xl mt-4'>
          <span className='font-semibold'>Result:</span> {result}
        </p>
      )}
      {showAnimation && (
        <div className='fixed inset-0 flex items-center justify-center bg-slate-800 bg-opacity-45'>
          <Lottie
            options={{
              loop: false,
              autoplay: true,
              animationData: animationData,
            }}
            height={400}
            width={400}
          />
        </div>
      )}
      {showHint && (
        <motion.div
          className='fixed bottom-4 right-4 p-4 bg-white border-2 border-red-500 rounded-lg shadow-lg flex items-center space-x-4'
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <p className='text-red-500'>
            Hint: Make sure you choose the correct arithmetic operation.
          </p>
          <button
            className='bg-red-500 text-white p-2 rounded-lg'
            onClick={() => setShowHint(false)}
          >
            Got it
          </button>
        </motion.div>
      )}
    </div>
  )
}

export default Lesson1
