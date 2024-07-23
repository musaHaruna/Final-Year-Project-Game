import React, { useState } from 'react'

const Lesson2 = () => {
  const [items, setItems] = useState({
    strings: ['Haruna', 'Jame', 'Apple', 'Musa'],
    numbers: ['42', '3.14', '100', '2024'],
    booleans: ['true', 'false', 'false', 'true'],
  })

  const [containers, setContainers] = useState({
    strings: [],
    numbers: [],
    booleans: [],
  })

  const [message, setMessage] = useState('')

  const onDragStart = (event, item, category) => {
    event.dataTransfer.setData('text/plain', JSON.stringify({ item, category }))
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
    const { item, category: originalCategory } = JSON.parse(
      event.dataTransfer.getData('text/plain')
    )
    if (category === originalCategory) {
      setContainers((prev) => ({
        ...prev,
        [category]: [...prev[category], item],
      }))
      setItems((prev) => ({
        ...prev,
        [originalCategory]: prev[originalCategory].filter((i) => i !== item),
      }))
      setMessage(`Successfully dropped ${item} in ${category}`)
    } else {
      setMessage(`Wrong container for ${item}. Please try again.`)
    }
    event.dataTransfer.clearData()
    event.currentTarget.style.cursor = 'default'
  }

  return (
    <div>
      <h1>Types of variables</h1>
      <p>
        <span>Strings:</span> Text enclosed in quotes (e.g., "Hello, World!")
      </p>
      <p>
        <span>Numbers:</span> Integers and floating-point numbers (e.g., 42,
        3.14)
      </p>
      <p>
        <span>Booleans:</span> True or False values
      </p>
      <div>
        <h1>
          <span>Mission:</span> Drag and drop the items into their appropriate
          container to store them
        </h1>
      </div>
      <div className='flex justify-between align-top'>
        <div
          onDragOver={onDragOver}
          onDrop={(event) => onDrop(event, 'strings')}
          className='w-40 h-40 border-2 p-2'
          style={{ cursor: 'default' }}
        >
          <h2>Strings</h2>
          {containers.strings.map((item, index) => (
            <h1 key={index} className='text-lg'>
              {item}
            </h1>
          ))}
        </div>
        <div
          onDragOver={onDragOver}
          onDrop={(event) => onDrop(event, 'numbers')}
          className='w-40 h-40 border-2 p-2'
          style={{ cursor: 'default' }}
        >
          <h2>Numbers</h2>
          {containers.numbers.map((item, index) => (
            <h1 key={index} className='text-lg'>
              {item}
            </h1>
          ))}
        </div>
        <div
          onDragOver={onDragOver}
          onDrop={(event) => onDrop(event, 'booleans')}
          className='w-40 h-40 border-2 p-2'
          style={{ cursor: 'default' }}
        >
          <h2>Booleans</h2>
          {containers.booleans.map((item, index) => (
            <h1 key={index} className='text-lg'>
              {item}
            </h1>
          ))}
        </div>
      </div>
      <div className='flex justify-between align-top mt-4'>
        {items.strings.map((item, index) => (
          <h1
            key={index}
            className='text-lg p-2 border m-1'
            draggable='true'
            onDragStart={(event) => onDragStart(event, item, 'strings')}
            onDragEnd={onDragEnd}
            style={{ cursor: 'grab' }}
          >
            {item}
          </h1>
        ))}
        {items.numbers.map((item, index) => (
          <h1
            key={index}
            className='text-lg p-2 border m-1'
            draggable='true'
            onDragStart={(event) => onDragStart(event, item, 'numbers')}
            onDragEnd={onDragEnd}
            style={{ cursor: 'grab' }}
          >
            {item}
          </h1>
        ))}
        {items.booleans.map((item, index) => (
          <h1
            key={index}
            className='text-lg p-2 border m-1'
            draggable='true'
            onDragStart={(event) => onDragStart(event, item, 'booleans')}
            onDragEnd={onDragEnd}
            style={{ cursor: 'grab' }}
          >
            {item}
          </h1>
        ))}
      </div>
      {message && <p>{message}</p>}
    </div>
  )
}

export default Lesson2
