import React, { useState } from 'react'
import { useDrag, useDrop, DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

// Define item types
const ItemTypes = {
  CONDITION: 'condition',
  SCENARIO: 'scenario',
}

// Draggable component for conditions
const DraggableCondition = ({ condition }) => {
  const [, drag] = useDrag(() => ({
    type: ItemTypes.CONDITION,
    item: { value: condition },
  }))

  return (
    <div ref={drag} className='p-2 m-1 bg-gray-300 cursor-pointer'>
      {condition}
    </div>
  )
}

// Drop zone for scenarios
const DropZone = ({ onDrop, currentValue }) => {
  const [, drop] = useDrop(() => ({
    accept: ItemTypes.CONDITION,
    drop: (item) => onDrop(item.value),
  }))

  return (
    <div
      ref={drop}
      className='p-4 m-2 min-h-[50px] bg-gray-200 border border-gray-400'
    >
      {currentValue || 'Drop condition here'}
    </div>
  )
}

// Main component
const Lesson1 = () => {
  const [scenario1, setScenario1] = useState('')
  const [scenario2, setScenario2] = useState('')
  const [scenario3, setScenario3] = useState('')
  const [scenario4, setScenario4] = useState('')
  const [feedback, setFeedback] = useState('')

  // Handle drop event for scenarios
  const handleDrop = (setScenario) => (item) => {
    setScenario(item)
  }

  const handleEvaluate = () => {
    let result = ''
    if (scenario1 === 'If temperature > 100') {
      result += 'Correct for scenario 1: activate cooling system. '
    } else {
      result += 'Incorrect condition for scenario 1. '
    }
    if (scenario2 === 'If it’s raining') {
      result += 'Correct for scenario 2: bring an umbrella. '
    } else {
      result += 'Incorrect condition for scenario 2. '
    }
    if (scenario3 === 'If temperature < 0') {
      result += 'Correct for scenario 3: activate heating system. '
    } else {
      result += 'Incorrect condition for scenario 3. '
    }
    if (scenario4 === 'If it’s sunny') {
      result += 'Correct for scenario 4: wear sunglasses. '
    } else {
      result += 'Incorrect condition for scenario 4. '
    }
    setFeedback(result)
  }

  return (
    <DndProvider backend={HTML5Backend}>
      <div className='p-4'>
        <h1 className='text-xl font-bold mb-4'>
          Introduction to Conditional Statements
        </h1>
        <p className='mb-4'>
          Conditional statements allow you to make decisions in your code. They
          help your program decide what action to take based on different
          conditions.
        </p>

        {/* Drag and Drop Conditions Section */}
        <h2 className='text-lg font-bold mb-2'>Drag and Drop Conditions</h2>
        <div className='flex mb-4'>
          <div className='flex flex-col mr-4'>
            <div>Scenario 1: If temperature is greater than 100</div>
            <DropZone
              onDrop={handleDrop(setScenario1)}
              currentValue={scenario1}
            />
          </div>
          <div className='flex flex-col mr-4'>
            <div>Scenario 2: If it’s raining</div>
            <DropZone
              onDrop={handleDrop(setScenario2)}
              currentValue={scenario2}
            />
          </div>
          <div className='flex flex-col mr-4'>
            <div>Scenario 3: If temperature is less than 0</div>
            <DropZone
              onDrop={handleDrop(setScenario3)}
              currentValue={scenario3}
            />
          </div>
          <div className='flex flex-col'>
            <div>Scenario 4: If it’s sunny</div>
            <DropZone
              onDrop={handleDrop(setScenario4)}
              currentValue={scenario4}
            />
          </div>
        </div>
        <div className='flex mb-4'>
          {[
            'If temperature > 100',
            'If it’s raining',
            'If temperature < 0',
            'If it’s sunny',
            'If it’s snowing',
            'If it’s cloudy',
          ].map((condition) => (
            <DraggableCondition key={condition} condition={condition} />
          ))}
        </div>

        {/* Button to evaluate the scenarios */}
        <button
          className='px-4 py-2 bg-blue-500 text-white rounded'
          onClick={handleEvaluate}
        >
          Evaluate
        </button>

        {/* Feedback and result display */}
        {feedback && (
          <div className='mt-4'>
            <h2 className='text-lg text-green-500'>{feedback}</h2>
          </div>
        )}
      </div>
    </DndProvider>
  )
}

export default Lesson1
