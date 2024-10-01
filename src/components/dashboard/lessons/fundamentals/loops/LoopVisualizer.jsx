import React, { useState, useEffect } from 'react'
import {
  ArrowUp,
  ArrowLeft,
  ArrowRight,
  RotateCcw,
  Play,
  StepForward,
  X,
  Repeat,
  Plus,
  Minus,
} from 'lucide-react'
import { usePoints } from '../../../../../context/PontsProvider'

const GRID_SIZE = 5
const INITIAL_POSITION = { x: 2, y: 4 }
const INITIAL_DIRECTION = 'up'

const DirectionIcon = ({ direction }) => {
  switch (direction) {
    case 'up':
      return <ArrowUp />
    case 'left':
      return <ArrowLeft />
    case 'right':
      return <ArrowRight />
    case 'down':
      return <ArrowUp className='rotate-180' />
    default:
      return null
  }
}

const ResultModal = ({ isOpen, onClose, isSuccess }) => {
  if (!isOpen) return null

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50'>
      <div className='relative bg-white p-6 rounded-lg w-96 shadow-lg'>
        <button
          onClick={onClose}
          className='absolute right-4 top-4 rounded-full bg-gray-200 hover:bg-gray-300 p-2 focus:outline-none'
        >
          <X className='h-4 w-4' />
        </button>
        <h2 className='text-2xl font-bold mb-2'>
          {isSuccess ? 'Congratulations!' : 'Try Again!'}
        </h2>
        <p className='mb-4'>
          {isSuccess
            ? "You've successfully guided the robot to the goal!"
            : "The robot didn't reach the goal. Keep trying!"}
        </p>
        <button
          onClick={onClose}
          className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors'
        >
          Close
        </button>
      </div>
    </div>
  )
}

const InteractiveRobotGrid = () => {
  const [robotPosition, setRobotPosition] = useState(INITIAL_POSITION)
  const [robotDirection, setRobotDirection] = useState(INITIAL_DIRECTION)
  const [commands, setCommands] = useState([])
  const [availableCommands] = useState([
    'move forward',
    'turn left',
    'turn right',
  ])
  const [output, setOutput] = useState('')
  const [isDragging, setIsDragging] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const handleDragStart = (e, command) => {
    e.dataTransfer.setData('text/plain', command)
    setIsDragging(true)
  }

  const handleDragOver = (e) => {
    e.preventDefault()
  }

  const handleDrop = (e) => {
    e.preventDefault()
    const command = e.dataTransfer.getData('text')
    setCommands([...commands, { type: command, repeat: 1 }])
    setIsDragging(false)
  }

  const handleDragEnd = () => {
    setIsDragging(false)
  }

  const moveRobot = (position, direction) => {
    const newPosition = { ...position }
    switch (direction) {
      case 'up':
        newPosition.y = Math.max(0, newPosition.y - 1)
        break
      case 'down':
        newPosition.y = Math.min(GRID_SIZE - 1, newPosition.y + 1)
        break
      case 'left':
        newPosition.x = Math.max(0, newPosition.x - 1)
        break
      case 'right':
        newPosition.x = Math.min(GRID_SIZE - 1, newPosition.x + 1)
        break
    }
    return newPosition
  }

  const turnRobot = (currentDirection, turn) => {
    const directions = ['up', 'right', 'down', 'left']
    const currentIndex = directions.indexOf(currentDirection)
    const newIndex = (currentIndex + (turn === 'right' ? 1 : -1) + 4) % 4
    return directions[newIndex]
  }

  const executeAllCommands = () => {
    setIsAnimating(true)
    let currentPosition = { ...INITIAL_POSITION }
    let currentDirection = INITIAL_DIRECTION
    let newOutput = ''

    commands.forEach((command) => {
      for (let i = 0; i < command.repeat; i++) {
        switch (command.type) {
          case 'move forward':
            currentPosition = moveRobot(currentPosition, currentDirection)
            newOutput += `Robot moved ${currentDirection}. `
            break
          case 'turn left':
          case 'turn right':
            currentDirection = turnRobot(
              currentDirection,
              command.type.split(' ')[1]
            )
            newOutput += `Robot turned ${command.type.split(' ')[1]}. `
            break
        }
      }
    })

    setRobotPosition(currentPosition)
    setRobotDirection(currentDirection)
    setOutput(newOutput)
    setIsAnimating(false)
    checkResult(currentPosition)
  }

  const resetRobot = () => {
    setRobotPosition(INITIAL_POSITION)
    setRobotDirection(INITIAL_DIRECTION)
    setCommands([])
    setOutput('')
    setIsAnimating(false)
  }

  const { addPoints, deductPoints } = usePoints()
  const checkResult = (finalPosition) => {
    const success = finalPosition.x === 0 && finalPosition.y === 0
    setIsSuccess(success)
    if (success) {
      addPoints(15)
    } else {
      deductPoints(5)
    }
    setShowModal(true)
  }

  const updateCommandRepeat = (index, change) => {
    const newCommands = [...commands]
    newCommands[index].repeat = Math.max(1, newCommands[index].repeat + change)
    setCommands(newCommands)
  }

  const removeCommand = (index) => {
    const newCommands = [...commands]
    newCommands.splice(index, 1)
    setCommands(newCommands)
  }

  return (
    <div className='p-4 bg-gray-100 rounded-lg shadow-md'>
      <h2 className='text-2xl font-bold mb-4'>Robot Navigation Challenge</h2>
      <p className='mb-4'>
        Guide the robot to the top-left corner (0,0) of the grid using the
        available commands. You can now repeat commands!
      </p>

      <div className='flex mb-4'>
        <div className='w-1/2 pr-4'>
          <h3 className='text-xl font-semibold mb-2'>Grid</h3>
          <div className='grid grid-cols-5 gap-0 bg-white p-1 rounded w-fit'>
            {[...Array(GRID_SIZE * GRID_SIZE)].map((_, index) => {
              const x = index % GRID_SIZE
              const y = Math.floor(index / GRID_SIZE)
              const isRobotHere = x === robotPosition.x && y === robotPosition.y
              return (
                <div
                  key={index}
                  className={`w-10 h-10 border flex items-center justify-center ${
                    x === 0 && y === 0 ? 'bg-green-200' : 'bg-gray-100'
                  } ${isRobotHere ? 'bg-blue-300' : ''}`}
                >
                  {isRobotHere && <DirectionIcon direction={robotDirection} />}
                </div>
              )
            })}
          </div>
        </div>

        <div className='w-1/2 pl-4'>
          <h3 className='text-xl font-semibold mb-2'>Commands</h3>
          <div
            className='bg-white p-2 rounded min-h-[200px] overflow-y-auto max-h-[400px]'
            onDragOver={handleDragOver}
            onDrop={handleDrop}
          >
            {commands.map((command, index) => (
              <div
                key={index}
                className='flex items-center bg-blue-100 p-2 mb-2 rounded'
              >
                <span className='flex-grow'>{command.type}</span>
                <div className='flex items-center'>
                  <button
                    onClick={() => updateCommandRepeat(index, -1)}
                    className='bg-red-500 text-white p-1 rounded mr-1'
                  >
                    <Minus size={16} />
                  </button>
                  <span className='mx-2'>{command.repeat}</span>
                  <button
                    onClick={() => updateCommandRepeat(index, 1)}
                    className='bg-green-500 text-white p-1 rounded mr-1'
                  >
                    <Plus size={16} />
                  </button>
                  <button
                    onClick={() => removeCommand(index)}
                    className='bg-red-500 text-white p-1 rounded'
                  >
                    <X size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className='mb-4'>
        <h3 className='text-xl font-semibold mb-2'>Available Commands</h3>
        <div className='flex space-x-2 flex-wrap'>
          {availableCommands.map((command) => (
            <div
              key={command}
              draggable
              onDragStart={(e) => handleDragStart(e, command)}
              onDragEnd={handleDragEnd}
              className={`bg-yellow-200 p-2 rounded cursor-move ${
                isDragging ? 'opacity-50' : 'opacity-100'
              } mb-2`}
            >
              {command}
            </div>
          ))}
        </div>
      </div>

      <div className='flex space-x-2 mb-4'>
        <button
          onClick={executeAllCommands}
          className='bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 flex items-center'
          disabled={isAnimating}
        >
          <Play className='mr-2' /> Run All
        </button>
        <button
          onClick={resetRobot}
          className='bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 flex items-center'
        >
          <RotateCcw className='mr-2' /> Reset
        </button>
      </div>

      <div className='bg-gray-200 p-2 rounded'>
        <h3 className='font-semibold'>Output:</h3>
        <p>{output}</p>
      </div>

      <ResultModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        isSuccess={isSuccess}
      />
    </div>
  )
}

export default InteractiveRobotGrid
