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

  const onDrop = (event, category) => {
    const item = event.dataTransfer.getData('text/plain')
    playSound(dropSound)
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
    <div>
      <h1 className='text-3xl font-bold mb-6 text-center'>Variables</h1>
      <p className='text-lg mb-4'>
        <span className='font-semibold'>Definition:</span> Explain that
        variables are like containers that hold data.
      </p>
      <p className='text-lg mb-4'>
        <span className='font-semibold'>Purpose:</span> Highlight how variables
        are used to store information that can be referenced and manipulated in
        a program.
      </p>
      <div className='mb-8'>
        <h2 className='text-1xl font-bold mb-2'>
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
            Hint: Make sure you drop the item in the correct container.
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
