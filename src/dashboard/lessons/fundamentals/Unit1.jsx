import React, { useState } from 'react'
import {
  ProgressBar,
  NavigationButton,
} from '../../../components/reusabale-ui/index'
import {
  Lesson1,
  Lesson2,
  Lesson3,
} from '../../../components/dashboard/lessons/fundamentals/index'

const lessonComponents = [Lesson1, Lesson2, Lesson3]
const progressIncrement = 100 / (lessonComponents.length - 1)

const Unit1 = () => {
  const [currentLessonIndex, setCurrentLessonIndex] = useState(0)
  const [progress, setProgress] = useState(0)

  const handleNext = () => {
    if (currentLessonIndex < lessonComponents.length - 1) {
      setCurrentLessonIndex((prev) => prev + 1)
      setProgress((prev) => Math.min(prev + progressIncrement, 100))
    }
  }

  const handlePrevious = () => {
    if (currentLessonIndex > 0) {
      setCurrentLessonIndex((prev) => prev - 1)
      setProgress((prev) => Math.max(prev - progressIncrement, 0))
    }
  }

  const handleCheck = (isCorrect) => {
    if (isCorrect) {
      setProgress((prev) => Math.min(prev + progressIncrement, 100))
      alert('Correct!')
    } else {
      alert('Try again!')
    }
  }

  const CurrentLessonComponent = lessonComponents[currentLessonIndex]

  return (
    <div className='m-auto mt-8'>
      <div style={{ height: '70vh' }} className='w-11/12 m-auto mt-8'>
        <ProgressBar progress={progress} />
        <CurrentLessonComponent onCheck={handleCheck} />
      </div>
      <hr className='my-10' />
      <div className='w-11/12 m-auto mt-8'>
        <div className='flex justify-between'>
          <NavigationButton
            text='PREVIOUS'
            bgColor='bg-gray-300'
            textColor=' text-gray-700'
            shadowColor='text-gray-700'
            onClick={handlePrevious}
            disabled={currentLessonIndex === 0}
          />
          <NavigationButton
            text='NEXT'
            bgColor='bg-gray-300'
            textColor=' text-gray-700'
            shadowColor='text-gray-700'
            onClick={handleNext}
            disabled={currentLessonIndex === lessonComponents.length - 1}
          />
        </div>
      </div>
    </div>
  )
}

export default Unit1
