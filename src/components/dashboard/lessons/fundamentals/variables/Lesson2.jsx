import React, { useState, useEffect } from 'react'
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

const Lesson2 = () => {
  const [items, setItems] = useState({
    strings: ['"Haruna"', '"Jame"', '"Apple"', '"Musa"'],
    numbers: ['42', '3.14', '100', '2024'],
    booleans: ['true', 'false', 'false', 'true'],
  })

  const [containers, setContainers] = useState({
    strings: [],
    numbers: [],
    booleans: [],
  })

  const [message, setMessage] = useState('')
  const [showAnimation, setShowAnimation] = useState(false)
  const [animationData, setAnimationData] = useState(null)
  const [showHint, setShowHint] = useState(false)

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

  const onDragStart = (event, item, category) => {
    event.dataTransfer.setData('text/plain', JSON.stringify({ item, category }))
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

  const onDrop = (event, category) => {
    const { item, category: originalCategory } = JSON.parse(
      event.dataTransfer.getData('text/plain')
    )
    playSound(dropSound)
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
      setAnimationData(
        successAnimations[Math.floor(Math.random() * successAnimations.length)]
      )
      playSound(correctSounds[Math.floor(Math.random() * correctSounds.length)])
      setShowHint(false)
    } else {
      setMessage(`Wrong container for ${item}. Please try again.`)
      setAnimationData(tryAgainAnimation)
      playSound(wrongSound)
      setShowHint(true)
    }
    setShowAnimation(true)
    event.dataTransfer.clearData()
    event.currentTarget.style.cursor = 'default'
  }

  useEffect(() => {
    if (showAnimation) {
      const timer = setTimeout(() => {
        setShowAnimation(false)
      }, 1500)
      return () => clearTimeout(timer)
    }
  }, [showAnimation])

  return (
    <div className=''>
      <h1 className='text-3xl font-bold mb-4 text-center'>
        Types of variables
      </h1>
      <p className='text-lg mb-4'>
        <span className='font-semibold'>Strings:</span> Text enclosed in quotes
        (e.g., "Hello, World!")
      </p>
      <p className='text-lg mb-4'>
        <span className='font-semibold'>Numbers:</span> Integers and
        floating-point numbers (e.g., 42, 3.14)
      </p>
      <p className='text-lg mb-6'>
        <span className='font-semibold'>Booleans:</span> True or False values
      </p>

      <div className='mb-2'>
        <h2 className='text-lg font-bold mb-4'>
          <span className='underline'>Mission:</span> Drag and drop the values
          into their appropriate container to store them
        </h2>
      </div>
      <div className='flex justify-around mb-6'>
        {['strings', 'numbers', 'booleans'].map((category) => (
          <div
            key={category}
            onDragOver={onDragOver}
            onDrop={(event) => onDrop(event, category)}
            className='min-w-32 min-h-32 p-4 border-4 border-dashed flex flex-col items-center justify-center rounded-lg shadow-md'
            style={{ cursor: 'default' }}
          >
            <h2 className='text-xl font-semibold mb-2 capitalize'>
              {category}
            </h2>
            {containers[category].map((item, index) => (
              <h1 key={index} className='text-lg'>
                {item}
              </h1>
            ))}
          </div>
        ))}
      </div>
      <div className='flex justify-around mb-4'>
        {items.strings.map((item, index) => (
          <h1
            key={index}
            className='text-lg p-2 border m-1 cursor-grab button-generic'
            draggable='true'
            onDragStart={(event) => onDragStart(event, item, 'strings')}
            onDragEnd={onDragEnd}
          >
            {item}
          </h1>
        ))}
        {items.numbers.map((item, index) => (
          <h1
            key={index}
            className='text-lg p-2 border m-1 cursor-grab button-generic'
            draggable='true'
            onDragStart={(event) => onDragStart(event, item, 'numbers')}
            onDragEnd={onDragEnd}
          >
            {item}
          </h1>
        ))}
        {items.booleans.map((item, index) => (
          <h1
            key={index}
            className='text-lg p-2 border m-1 cursor-grab button-generic'
            draggable='true'
            onDragStart={(event) => onDragStart(event, item, 'booleans')}
            onDragEnd={onDragEnd}
          >
            {item}
          </h1>
        ))}
      </div>
      {showAnimation && (
        <div className='fixed inset-0 flex items-center justify-center bg-slate-700 bg-opacity-25'>
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
        <div className='fixed bottom-4 right-4 p-4 bg-white border-2 border-red-500 rounded-lg shadow-lg flex items-center space-x-4'>
          <p className='text-red-500'>
            Hint: Make sure you drop the item in the correct container.
          </p>
          <button
            className='bg-red-500 text-white p-2 rounded-lg'
            onClick={() => setShowHint(false)}
          >
            Got it!
          </button>
        </div>
      )}
    </div>
  )
}

export default Lesson2
