import React, { useState, useEffect, useRef } from 'react'
import Lesson from '../../../../code-editor/Lesson'
import Lottie from 'react-lottie'
import successAnimation1 from '../../../../../assets/animations/encouragements/excellent.json'
import successAnimation2 from '../../../../../assets/animations/encouragements/good-job.json'
import successAnimation3 from '../../../../../assets/animations/encouragements/nice.json'
import character from '../../../../../assets/animations/fundamentals/character.lottie'

const elements = [
  { variable: 'int length =' },
  { variable: 'int width =' },
  { operation: 'int area = length * width' },
  { output: 'display area Result' },
]

const instructions = [
  'Enter the length of the rectangle (in units).',
  'Enter the width of the rectangle (in units).',
  'Calculate the area of the rectangle.',
  'Review the calculated area result.',
]

const successMessage =
  'Congratulations! You have successfully calculated the area of the rectangle.'

const Lesson5 = () => {
  const [stepIndex, setStepIndex] = useState(0)
  const [animationData, setAnimationData] = useState(null)
  const [startAnimation, setStartAnimation] = useState('')
  const dotLottieRef = useRef(null)

  const handlePlayLesson3 = (workspace, setOutput) => {
    let variables = {}
    let errors = []
    let area = null

    workspace.forEach((item) => {
      if (item.variable === 'int length =' || item.variable === 'int width =') {
        if (item.value.trim() === '') {
          errors.push(`Please input a value for ${item.variable}`)
        } else if (isNaN(Number(item.value.trim()))) {
          errors.push(`Value for ${item.variable} should be a number`)
        } else {
          variables[item.variable.split('=')[0].trim()] = Number(
            item.value.trim()
          )
        }
      }
    })

    if (
      variables['int length'] !== undefined &&
      variables['int width'] !== undefined
    ) {
      area = variables['int length'] * variables['int width']
    } else {
      errors.push('Please provide values for both length and width.')
    }

    if (errors.length > 0) {
      setOutput(`Errors: ${errors.join('; ')}`)
    } else {
      setOutput(
        `${successMessage}\nThe area of the rectangle is ${area} square units.`
      )
      setStartAnimation(successMessage)
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

  const handleNextStepLesson3 = (
    workspace,
    stepIndex,
    setStepIndex,
    setAnimationData
  ) => {
    const steps = [
      'int length =',
      'int width =',
      'int area = length * width',
      'display area Result',
    ]

    if (
      stepIndex < steps.length &&
      workspace[stepIndex]?.variable === steps[stepIndex]
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
        Rectangle Area Calculator
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
        handlePlay={handlePlayLesson3}
        handleNextStep={(workspace) =>
          handleNextStepLesson3(
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
