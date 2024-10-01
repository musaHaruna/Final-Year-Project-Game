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
import skyImage from '../../../../../assets/clouds.jpg'

const Lesson1 = () => {
  const [pathChosen, setPathChosen] = useState(null)
  const [showAnimation, setShowAnimation] = useState(false)
  const [animationData, setAnimationData] = useState(null)
  const [message, setMessage] = useState('')
  const [isSkyBlue, setIsSkyBlue] = useState(null) // State to track the sky color

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

  const onDragStart = (event, path) => {
    event.dataTransfer.setData('text/plain', path)
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
    const path = event.dataTransfer.getData('text/plain')
    playSound(dropSound)
    setPathChosen(path)
    evaluateChoice(path)
    event.dataTransfer.clearData()
    event.currentTarget.style.cursor = 'default'
  }

  const evaluateChoice = (path) => {
    let resultMessage = ''
    let animation = null
    let sound = null

    if (path === 'yes') {
      resultMessage = 'Correct! The sky is blue.'
      setIsSkyBlue(true)
      animation =
        successAnimations[Math.floor(Math.random() * successAnimations.length)]
      sound = correctSounds[Math.floor(Math.random() * correctSounds.length)]
    } else if (path === 'no') {
      resultMessage = 'Incorrect. The sky is blue, not another color.'
      setIsSkyBlue(false)
      animation = tryAgainAnimation
      sound = wrongSound
    } else {
      resultMessage = "This shouldn't happen. Please try again."
      animation = tryAgainAnimation
      sound = wrongSound
    }

    setMessage(resultMessage)
    setAnimationData(animation)
    playSound(sound)
    setShowAnimation(true)
    setTimeout(() => setShowAnimation(false), 2000)
  }

  return (
    <div>
      <h1 className='text-3xl font-bold mb-6 text-center'>Conditionals?</h1>
      <p className='text-lg mb-4'>
        Conditionals are like a traffic light for decisions: they help us choose
        what to do based on different situations. For example, if it’s sunny,
        you go outside; if it’s raining, you stay in
      </p>
      <p className='text-lg mb-4'>
        Drag and drop to answer the question: Is the sky blue?
      </p>

      <div className='flex justify-center'>
        <img src={skyImage} alt='Sky' className='w-44' />
      </div>
      <div
        onDragOver={onDragOver}
        onDrop={onDrop}
        className='w-full h-32 border-4 border-dashed flex flex-col items-center justify-center rounded-lg shadow-md mb-8'
        style={{ cursor: 'default' }}
      >
        <h2 className='text-xl font-semibold mb-2'>
          Drag and Drop Your Choice
        </h2>
        {pathChosen && <p className='text-2xl mt-4'>{message}</p>}
      </div>
      <div className='flex justify-around mb-4'>
        <h1
          className='text-4xl cursor-grab'
          draggable='true'
          onDragStart={(event) => onDragStart(event, 'yes')}
          onDragEnd={onDragEnd}
        >
          Yes
        </h1>
        <h1
          className='text-4xl cursor-grab'
          draggable='true'
          onDragStart={(event) => onDragStart(event, 'no')}
          onDragEnd={onDragEnd}
        >
          No
        </h1>
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
    </div>
  )
}

export default Lesson1
