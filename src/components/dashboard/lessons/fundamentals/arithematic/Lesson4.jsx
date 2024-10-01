import React, { useState, useEffect, useRef } from 'react'
import Lesson from '../../../../code-editor/Lesson'
import Lottie from 'react-lottie'
import successAnimation1 from '../../../../../assets/animations/encouragements/excellent.json'
import successAnimation2 from '../../../../../assets/animations/encouragements/good-job.json'
import successAnimation3 from '../../../../../assets/animations/encouragements/nice.json'
import character from '../../../../../assets/animations/fundamentals/running.lottie'

// Define elements for rectangle area calculation with updated format
const elements = [
  { variable: 'number length =' },
  { variable: 'number width =' },
  { operation: 'number area = [length] * [width]' },
  { output: 'number area' },
]

const instructions = [
  "Drag and drop 'number length =' and input a value for the length.",
  "Drag and drop 'number width =' and input a value for the width.",
  "Drag and drop 'number area = [length] * [width]' to calculate the area.",
  "Drag and drop 'number area' to display the result.",
]

const successMessage =
  'Congratulations! You have successfully calculated the area of the rectangle:'

const Lesson5 = () => {
  const [stepIndex, setStepIndex] = useState(0)
  const [animationData, setAnimationData] = useState(null)
  const [startAnimation, setStartAnimation] = useState('')
  const dotLottieRef = useRef(null)

  const handlePlayLesson4 = (workspace, setOutput) => {
    let variables = {}
    let errors = []
    let displayArea = false

    workspace.forEach((item) => {
      if (item.type === 'number length =' || item.type === 'number width =') {
        if (item.value.trim() === '') {
          errors.push(`Please input a value for ${item.type}`)
        } else if (isNaN(Number(item.value.trim()))) {
          errors.push(`Value for ${item.type} should be a number`)
        } else {
          variables[item.type.split('=')[0].trim()] = {
            type: 'number',
            value: Number(item.value.trim()),
          }
        }
      } else if (item.type === 'number area = [length] * [width]') {
        if (!variables['number length'] || !variables['number width']) {
          errors.push(
            `Define both 'number length =' and 'number width =' before using 'number area ='`
          )
        } else {
          variables['number area'] = {
            type: 'number',
            value:
              variables['number length'].value *
              variables['number width'].value,
          }
        }
      } else if (item.type === 'number area') {
        displayArea = true
      } else {
        errors.push(`Unexpected variable type: ${item.type}`)
      }
    })

    if (errors.length > 0) {
      setOutput(`Errors: ${errors.join('; ')}`)
    } else if (displayArea) {
      const result = `number area = ${variables['number area'].value}`
      setOutput(`${successMessage} ${result}`)
      setStartAnimation(successMessage)
    } else {
      setOutput(`Please include 'number area' to display the result`)
    }
  }

  useEffect(() => {
    if (dotLottieRef.current) {
      if (startAnimation === successMessage) {
        dotLottieRef.current.play()
      } else {
        dotLottieRef.current.stop()
      }
    }
  }, [startAnimation])

  const handleNextStepLesson4 = (
    workspace,
    stepIndex,
    setStepIndex,
    setAnimationData
  ) => {
    const steps = [
      'number length =',
      'number width =',
      'number area = [length] * [width]',
      'number area',
    ]

    if (
      stepIndex < steps.length &&
      workspace[stepIndex]?.type === steps[stepIndex]
    ) {
      const successAnimations = [
        successAnimation1,
        successAnimation2,
        successAnimation3,
      ]
      const randomIndex = Math.floor(Math.random() * successAnimations.length)
      setAnimationData(successAnimations[randomIndex])
      setStepIndex(stepIndex + 1)
    }
  }

  useEffect(() => {
    if (animationData) {
      const timer = setTimeout(() => {
        setAnimationData(null)
      }, 3000) // Display animation for 3 seconds

      return () => clearTimeout(timer)
    }
  }, [animationData])

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  }

  return (
    <div>
      <h2 className='text-xl text-center font-medium mb-1'>
        Calculating Rectangle Area
      </h2>
      <p className='text-center'>
        <span className='font-bold'>Mission:</span> Calculate the area of a
        rectangle
      </p>
      <Lesson
        elements={elements}
        instructions={instructions}
        dotLottieRef={dotLottieRef}
        outputAnimation={character}
        handlePlay={handlePlayLesson4}
        handleNextStep={(workspace) =>
          handleNextStepLesson4(
            workspace,
            stepIndex,
            setStepIndex,
            setAnimationData
          )
        }
      />
      {animationData && (
        <div className='fixed inset-0 flex items-center justify-center bg-slate-700 bg-opacity-25'>
          <Lottie options={defaultOptions} height={400} width={400} />
        </div>
      )}
    </div>
  )
}

export default Lesson5
