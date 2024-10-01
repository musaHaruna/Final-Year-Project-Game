import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom' // Import useNavigate
import { useProgress } from '../../../context/ProgressContext'
import { usePoints } from '../../../context/PontsProvider'
import PointsDisplay from '../../../components/reusabale-ui/PointsDisplay'
import {
  ProgressBar,
  NavigationButton,
} from '../../../components/reusabale-ui/index'
import {
  Lesson1,
  Lesson2,
  Lesson3,
  Lesson4,
  Lesson5,
  Lesson6,
  Lesson7,
  Lesson8,
} from '../../../components/dashboard/lessons/fundamentals/arithematic/index'

const lessonComponents = [
  Lesson1,
  Lesson2,
  Lesson3,
  Lesson4,
  Lesson5,
  Lesson6,
  Lesson7,
  Lesson8,
]
const progressIncrement = 100 / (lessonComponents.length - 1)

const Unit2 = () => {
  const { state: globalProgress, dispatch } = useProgress() // Access progress context
  const [currentLessonIndex, setCurrentLessonIndex] = useState(0)
  const [localProgress, setLocalProgress] = useState(0)
  const navigate = useNavigate() // Initialize useNavigate

  // Initialize local progress from global progress
  useEffect(() => {
    const unitProgress = globalProgress[2] || 2 // Assuming unit 2 is at index 2
    setLocalProgress(unitProgress)
  }, [globalProgress])

  // Update progress in context
  const updateProgress = (newProgress) => {
    setLocalProgress(newProgress)
    dispatch({ type: 'UPDATE_PROGRESS', index: 2, progress: newProgress })
  }

  // Handle navigation
  const handleNext = () => {
    if (currentLessonIndex < lessonComponents.length - 1) {
      setCurrentLessonIndex((prev) => prev + 1)
      const newProgress = Math.min(localProgress + progressIncrement, 100)
      updateProgress(newProgress)
    } else {
      // Ensure progress is set to 100% when reaching the final lesson
      updateProgress(100)
      navigate('/') // Navigate to the next route after completing the last lesson
    }
  }

  const handlePrevious = () => {
    if (currentLessonIndex === 0) {
      navigate('/') // Navigate to home if on the first lesson and "Previous" is clicked
    } else {
      setCurrentLessonIndex((prev) => prev - 1)
      const newProgress = Math.max(localProgress - progressIncrement, 0)
      updateProgress(newProgress)
    }
  }

  const handleCompletionStatusChange = (isComplete) => {
    if (isComplete) {
      handleNext()
    }
  }

  const CurrentLessonComponent = lessonComponents[currentLessonIndex]

  return (
    <div className='m-auto' style={{ overflowY: 'hidden' }}>
      <div className='w-11/12 m-auto mt-4 '>
        <ProgressBar progress={localProgress} />
        <PointsDisplay />
        <div style={{ height: '440px', overflowY: 'scroll' }}>
          <CurrentLessonComponent
            onCompletionStatusChange={handleCompletionStatusChange}
          />
        </div>
      </div>
      <hr />
      <div className='w-11/12 m-auto mt-2 '>
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

export default Unit2
