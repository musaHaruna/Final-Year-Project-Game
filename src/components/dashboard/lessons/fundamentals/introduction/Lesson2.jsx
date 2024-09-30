import React, { useState, useEffect } from 'react'
import { useDrag, useDrop } from 'react-dnd'
import { motion } from 'framer-motion'
import Lottie from 'react-lottie-player'
import successAnimation from '../../../../../assets/animations/encouragements/excellent.json'
import tryAgainAnimation from '../../../../../assets/animations/encouragements/try-again.json'
import correctSound from '../../../../../assets/sounds/encouragement/success.mp3'
import wrongSound from '../../../../../assets/sounds/encouragement/error.mp3'
import dragSound from '../../../../../assets/sounds/generic/click.mp3'
import dropSound from '../../../../../assets/sounds/generic/drop.mp3'
import img1 from '../../../../../assets/step1.jpg'
import img2 from '../../../../../assets/step2.jpg'
import img3 from '../../../../../assets/step3.jpg'
import { usePoints } from '../../../../../context/PontsProvider' // Import the usePoints hook

const DND_TYPE = 'STEP'

const steps = [
  { id: 1, text: 'Get two slices of bread', img: img1 },
  { id: 2, text: 'Spread butter on one slice', img: img2 },
  { id: 3, text: 'Add some ham on top', img: img3 },
]

const Step = ({ step, index }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: DND_TYPE,
    item: { step, index },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }))

  const playDragSound = () => {
    new Audio(dragSound).play()
  }

  return (
    <motion.div
      ref={drag}
      className={`p-4 bg-white border rounded-md ${
        isDragging ? 'opacity-50' : ''
      }`}
      whileHover={{ scale: 1.05 }}
      onMouseDown={playDragSound}
    >
      {step.text}
    </motion.div>
  )
}

const Slot = ({ onDrop, index, step }) => {
  const [{ isOver }, drop] = useDrop({
    accept: DND_TYPE,
    drop: (item) => onDrop(item, index),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  })

  const playDropSound = () => {
    new Audio(dropSound).play()
  }

  return (
    <motion.div
      ref={drop}
      className={`p-4 border-2 rounded-md ${
        isOver ? 'bg-green-200' : 'bg-gray-100'
      }`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      onDrop={playDropSound}
    >
      {step ? step.text : 'Drop step here'}
    </motion.div>
  )
}

const Modal = ({ isOpen, onClose, stepImage }) => {
  if (!isOpen) return null

  return (
    <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50'>
      <div className='bg-white rounded-lg p-6 shadow-lg'>
        <h3 className='text-lg font-semibold mb-4'>You've completed a step!</h3>
        <div className='flex justify-center'>
          <motion.img
            src={stepImage}
            alt='Step'
            className='w-32 h-32'
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          />
        </div>
        <button
          onClick={onClose}
          className='mt-4 px-4 py-2 bg-blue-500 text-white rounded-md'
        >
          Close
        </button>
      </div>
    </div>
  )
}

const LottieModal = ({ isOpen, onClose, animation }) => {
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        onClose()
      }, 2000)
      return () => clearTimeout(timer)
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50'>
      <Lottie
        loop={false}
        animationData={animation}
        play
        style={{ width: 200, height: 200 }}
      />
    </div>
  )
}

const Lesson2 = () => {
  const [slots, setSlots] = useState([null, null, null])
  const [stepImages, setStepImages] = useState([null, null, null])
  const [output, setOutput] = useState('')
  const [lottieAnimation, setLottieAnimation] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [currentStepImage, setCurrentStepImage] = useState(null)
  const [isLottieOpen, setIsLottieOpen] = useState(false)

  const { addPoints, deductPoints } = usePoints() // Use the addPoints and deductPoints functions

  const handleDrop = (item, slotIndex) => {
    const updatedSlots = [...slots]
    updatedSlots[slotIndex] = item.step

    const updatedImages = [...stepImages]
    updatedImages[slotIndex] = item.step.img

    setStepImages(updatedImages)
    setSlots(updatedSlots)

    setCurrentStepImage(item.step.img)
    setIsModalOpen(true)
  }

  const handleCheck = () => {
    const correctOrder = steps.map((step) => step.text)
    const userOrder = slots.map((slot) => (slot ? slot.text : ''))

    if (JSON.stringify(correctOrder) === JSON.stringify(userOrder)) {
      new Audio(correctSound).play()
      setLottieAnimation(successAnimation)
      setIsLottieOpen(true)
      setOutput("Great job! You've successfully made the sandwich!")

      addPoints(15) // Add points for the correct order
    } else {
      new Audio(wrongSound).play()
      setLottieAnimation(tryAgainAnimation)
      setIsLottieOpen(true)
      setOutput('Oops, the steps are out of order. Try again!')

      deductPoints(5) // Deduct points for the wrong order
    }
  }

  return (
    <div className='bg-white rounded-lg shadow-md p-6 mb-6'>
      <h2 className='text-2xl font-semibold mb-4 text-blue-500'>
        Programs are like Recipes
      </h2>
      <p className='text-lg mb-4 text-gray-700'>
        A program is like a recipe. It's a set of step-by-step instructions that
        tell the computer what to do.
      </p>
      <p className='text-lg font-semibold text-blue-500'>Your Task:</p>
      <p className='text-lg mb-4 text-gray-700'>
        Drag the steps in the correct order to make a sandwich!
      </p>

      <div className='grid grid-cols-2 gap-4'>
        <div>
          <h3 className='text-lg font-semibold mb-2 text-gray-700'>
            Available Steps:
          </h3>
          <div className='space-y-4'>
            {steps.map((step, index) => (
              <Step key={index} step={step} index={index} />
            ))}
          </div>
        </div>

        <div>
          <h3 className='text-lg font-semibold mb-2 text-gray-700'>
            Your Recipe:
          </h3>
          <div className='space-y-4'>
            {slots.map((slot, index) => (
              <Slot key={index} index={index} step={slot} onDrop={handleDrop} />
            ))}
          </div>
        </div>
      </div>

      <button
        onClick={handleCheck}
        className='mt-4 bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50'
      >
        Check Order
      </button>

      {output && (
        <div className='mt-4 p-4 bg-gray-100 rounded-md'>
          <p className='text-lg whitespace-pre-line text-gray-800'>{output}</p>
        </div>
      )}

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        stepImage={currentStepImage}
      />

      <LottieModal
        isOpen={isLottieOpen}
        onClose={() => setIsLottieOpen(false)}
        animation={lottieAnimation}
      />
    </div>
  )
}

export default Lesson2
