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
    <div className='p-8'>
      <motion.h1
        className='text-4xl font-bold mb-6 text-center'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        Types of variables
      </motion.h1>
      <motion.p
        className='text-lg mb-4'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        <span className='font-semibold'>Strings:</span> Text enclosed in quotes
        (e.g., "Hello, World!")
      </motion.p>
      <motion.p
        className='text-lg mb-4'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        <span className='font-semibold'>Numbers:</span> Integers and
        floating-point numbers (e.g., 42, 3.14)
      </motion.p>
      <motion.p
        className='text-lg mb-8'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        <span className='font-semibold'>Booleans:</span> True or False values
      </motion.p>

      <div className='mb-8'>
        <motion.h2
          className='text-2xl font-bold mb-4'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <span className='underline'>Mission:</span> Drag and drop the values
          into their appropriate container to store them
        </motion.h2>
      </div>
      <motion.div
        className='flex justify-around mb-8'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7, duration: 0.5 }}
      >
        {['strings', 'numbers', 'booleans'].map((category) => (
          <motion.div
            key={category}
            onDragOver={onDragOver}
            onDrop={(event) => onDrop(event, category)}
            className='min-w-32 min-h-32 p-4 border-4 border-dashed flex flex-col items-center justify-center rounded-lg shadow-md'
            style={{ cursor: 'default' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <h2 className='text-xl font-semibold mb-2 capitalize'>
              {category}
            </h2>
            {containers[category].map((item, index) => (
              <h1 key={index} className='text-lg'>
                {item}
              </h1>
            ))}
          </motion.div>
        ))}
      </motion.div>
      <motion.div
        className='flex justify-around mb-4'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7, duration: 0.5 }}
      >
        {items.strings.map((item, index) => (
          <motion.h1
            key={index}
            className='text-lg p-2 border m-1 cursor-grab'
            draggable='true'
            onDragStart={(event) => onDragStart(event, item, 'strings')}
            onDragEnd={onDragEnd}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {item}
          </motion.h1>
        ))}
        {items.numbers.map((item, index) => (
          <motion.h1
            key={index}
            className='text-lg p-2 border m-1 cursor-grab'
            draggable='true'
            onDragStart={(event) => onDragStart(event, item, 'numbers')}
            onDragEnd={onDragEnd}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {item}
          </motion.h1>
        ))}
        {items.booleans.map((item, index) => (
          <motion.h1
            key={index}
            className='text-lg p-2 border m-1 cursor-grab'
            draggable='true'
            onDragStart={(event) => onDragStart(event, item, 'booleans')}
            onDragEnd={onDragEnd}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {item}
          </motion.h1>
        ))}
      </motion.div>
      {showAnimation && (
        <div className='fixed inset-0 flex items-center justify-center bg-opacity-0'>
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
            Hint: Make sure you drop the item in the correct container.
          </p>
          <button
            className='bg-red-500 text-white p-2 rounded-lg'
            onClick={() => setShowHint(false)}
          >
            Got it!
          </button>
        </motion.div>
      )}
      {message && (
        <motion.div
          className='fixed top-4 left-1/2 transform -translate-x-1/2 p-4 bg-white border-2 border-green-500 rounded-lg shadow-lg'
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {message}
        </motion.div>
      )}
    </div>
  )
}

export default Lesson2
