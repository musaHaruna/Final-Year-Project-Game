import React, { useState } from 'react'
import 'tailwindcss/tailwind.css'

const Lesson1 = () => {
  const [items, setItems] = useState({
    apple: true,
    mango: true,
    ball: true,
  })
  const [containers, setContainers] = useState({
    apple: [],
    mango: [],
    ball: [],
  })
  const [message, setMessage] = useState('')

  const onDragStart = (event, item) => {
    event.dataTransfer.setData('text/plain', item)
    event.currentTarget.style.cursor = 'grabbing'
  }

  const onDragEnd = (event) => {
    event.currentTarget.style.cursor = 'grab'
  }

  const onDragOver = (event) => {
    event.preventDefault()
    event.currentTarget.style.cursor = 'pointer'
  }

  const onDrop = (event, category) => {
    const item = event.dataTransfer.getData('text/plain')
    if (item === category) {
      setContainers((prev) => ({
        ...prev,
        [category]: [...prev[category], item],
      }))
      setItems((prev) => ({
        ...prev,
        [item]: false,
      }))
      setMessage(`Successfully dropped ${item} in ${category}`)
    } else {
      setMessage(`Wrong container for ${item}. Please try again.`)
    }
    event.dataTransfer.clearData()
    event.currentTarget.style.cursor = 'default'
  }

  return (
    <div className='p-8'>
      <h1 className='text-4xl font-bold mb-6 text-center'>Variables</h1>
      <p className='text-lg mb-4'>
        <span className='font-semibold'>Definition:</span> Explain that
        variables are like containers that hold data.
      </p>
      <p className='text-lg mb-8'>
        <span className='font-semibold'>Purpose:</span> Highlight how variables
        are used to store information that can be referenced and manipulated in
        a program.
      </p>
      <div className='mb-8'>
        <h2 className='text-2xl font-bold mb-4'>
          <span className='underline'>Mission:</span> Drag and drop the Icons
          into their appropriate container to store them
        </h2>
      </div>
      <div className='flex justify-around mb-8'>
        {['mango', 'ball', 'apple'].map((category) => (
          <div
            key={category}
            onDragOver={onDragOver}
            onDrop={(event) => onDrop(event, category)}
            className='w-32 h-32 border-4 border-dashed flex flex-col items-center justify-center rounded-lg shadow-md'
            style={{ cursor: 'default' }}
          >
            <h2 className='text-xl font-semibold mb-2 capitalize'>
              {category}
            </h2>
            {containers[category].map((item, index) => (
              <h1 key={index} className='text-4xl'>
                {item === 'mango' ? '🥭' : item === 'ball' ? '⚽' : '🍎'}
              </h1>
            ))}
          </div>
        ))}
      </div>
      <div className='flex justify-around mb-4'>
        {items.apple && (
          <h1
            className='text-4xl cursor-grab'
            draggable='true'
            onDragStart={(event) => onDragStart(event, 'apple')}
            onDragEnd={onDragEnd}
          >
            🍎
          </h1>
        )}
        {items.mango && (
          <h1
            className='text-4xl cursor-grab'
            draggable='true'
            onDragStart={(event) => onDragStart(event, 'mango')}
            onDragEnd={onDragEnd}
          >
            🥭
          </h1>
        )}
        {items.ball && (
          <h1
            className='text-4xl cursor-grab'
            draggable='true'
            onDragStart={(event) => onDragStart(event, 'ball')}
            onDragEnd={onDragEnd}
          >
            ⚽
          </h1>
        )}
      </div>
      {message && (
        <p className='text-lg font-semibold text-center text-green-600'>
          {message}
        </p>
      )}
    </div>
  )
}

export default Lesson1
