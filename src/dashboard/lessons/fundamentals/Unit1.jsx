import React, { useState, useEffect } from 'react'
import { useProgress } from '../../../context/ProgressContext'
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
} from '../../../components/dashboard/lessons/fundamentals/variables/index'

const lessonComponents = [Lesson1, Lesson2, Lesson3, Lesson4, Lesson5]
const progressIncrement = 100 / (lessonComponents.length - 1)

const Unit1 = () => {
  const { state: globalProgress, dispatch } = useProgress() // Access progress context
  const [currentLessonIndex, setCurrentLessonIndex] = useState(0)
  const [localProgress, setLocalProgress] = useState(0)

  // Initialize local progress from global progress
  useEffect(() => {
    const unitProgress = globalProgress[0] || 0 // Assuming unit 1 is at index 0
    setLocalProgress(unitProgress)
  }, [globalProgress])

  // Update progress in context
  const updateProgress = (newProgress) => {
    setLocalProgress(newProgress)
    dispatch({ type: 'UPDATE_PROGRESS', index: 0, progress: newProgress })
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
    }
  }

  const handlePrevious = () => {
    if (currentLessonIndex > 0) {
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
    <div className='m-auto mt-8'>
      <div style={{ height: '20%' }} className='w-11/12 m-auto mt-8'>
        <ProgressBar progress={localProgress} />
        <CurrentLessonComponent
          onCompletionStatusChange={handleCompletionStatusChange}
        />
      </div>
      <hr />
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
