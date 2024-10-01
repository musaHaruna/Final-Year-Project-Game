import React, { useState, useEffect, useRef } from 'react'
import Lesson from '../../../../code-editor/Lesson'
import Lottie from 'react-lottie'
import successAnimation1 from '../../../../../assets/animations/encouragements/excellent.json'
import successAnimation2 from '../../../../../assets/animations/encouragements/good-job.json'
import successAnimation3 from '../../../../../assets/animations/encouragements/nice.json'
import tryAgainAnimation from '../../../../../assets/animations/encouragements/try-again.json'
import character from '../../../../../assets/animations/fundamentals/running.lottie'

const elements = [
  { variable: 'string firstName =' },
  { variable: 'number age =' },
  { variable: 'string lastName =' },
  { output: 'display firstName' },
  { output: 'display age' },
  { output: 'display lastName' },
  // Incorrect options
  { variable: 'string age =' }, // Age should be a number, not a string
  { variable: 'number firstName =' }, // First Name should be a string, not a number
  { variable: 'number lastName =' }, // Last Name should be a string, not a number
  { variable: 'int lastName =' }, // Incorrect data type for Last Name
  { output: 'Show firstName' }, // Incorrect output command
  { output: 'output age' }, // Incorrect output command
  { output: 'output lastName' }, // Incorrect output command
]
const successMessage =
  'Congratulations! You have successfully stored the variables:'
const Lesson5 = () => {
  const [startAnimation, setStartAnimation] = useState('')
  const dotLottieRef = useRef(null)
  const handlePlayLesson5 = (workspace, setOutput) => {
    let variables = {}
    let errors = []
    let displayFirstName = false
    let displayAge = false
    let displayLastName = false

    const requiredVariables = [
      { type: 'string firstName =', found: false, value: '' },
      { type: 'number age =', found: false, value: '' },
      { type: 'string lastName =', found: false, value: '' },
    ]

    workspace.forEach((item) => {
      const match = requiredVariables.find((v) => v.type === item.type)
      if (match) {
        match.found = true
        match.value = item.value.trim()

        if (item.value.trim() === '') {
          errors.push(`Please input a value for ${item.type}`)
        } else if (
          match.type.startsWith('number') &&
          isNaN(item.value.trim())
        ) {
          errors.push(
            `Variable ${
              item.type
            } expects a number, but got: ${item.value.trim()}`
          )
        } else if (
          match.type.startsWith('string') &&
          (!item.value.trim().startsWith('"') ||
            !item.value.trim().endsWith('"'))
        ) {
          errors.push(
            `Variable ${
              item.type
            } expects a string wrapped in quotes, but got: ${item.value.trim()}`
          )
        } else {
          variables[item.type.split('=')[0].trim()] = {
            type: match.type.startsWith('number') ? 'number' : 'string',
            value: match.type.startsWith('number')
              ? parseFloat(item.value.trim())
              : item.value.trim().slice(1, -1), // remove quotes
          }
        }
      } else if (item.type === 'display firstName') {
        displayFirstName = true
      } else if (item.type === 'display age') {
        displayAge = true
      } else if (item.type === 'display lastName') {
        displayLastName = true
      } else {
        errors.push(`Unexpected variable type or output command: ${item.type}`)
      }
    })

    requiredVariables.forEach((variable) => {
      if (!variable.found) {
        errors.push(`Missing required variable: ${variable.type}`)
      }
    })

    if (errors.length > 0) {
      setOutput(`Errors: ${errors.join('; ')}`)
    } else if (displayFirstName && displayAge && displayLastName) {
      const result = Object.entries(variables)
        .map(([key, { type, value }]) => `${key} = ${value} (${type})`)
        .join(', ')
      setOutput(`${successMessage}  ${result} `)
      setStartAnimation(successMessage)
    } else {
      setOutput(
        `Please use "display firstName", "display age" and "display lastName" to display the variables`
      )
    }
  }

  const handleNextStepLesson5 = (
    workspace,
    stepIndex,
    setStepIndex,
    setAnimationData
  ) => {
    const steps = [
      'string firstName =',
      'number age =',
      'string lastName =',
      'display firstName',
      'display age',
      'display lastName',
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
    } else {
      setAnimationData(tryAgainAnimation)
    }
  }

  const [stepIndex, setStepIndex] = useState(0)
  const [animationData, setAnimationData] = useState(null)

  useEffect(() => {
    if (animationData) {
      const timer = setTimeout(() => {
        setAnimationData(null)
      }, 3000) // Display animation for 3 seconds

      return () => clearTimeout(timer)
    }
  }, [animationData])

  useEffect(() => {
    if (dotLottieRef.current) {
      if (startAnimation === successMessage) {
        dotLottieRef.current.play()
      } else {
        dotLottieRef.current.stop()
      }
    }
  }, [startAnimation, dotLottieRef, successMessage])

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
        Storing values in variables
      </h2>
      <p className='text-center'>
        <span className='font-bold'>Mission:</span> Store variables correctly of
        different types and make the character run
      </p>
      <Lesson
        elements={elements}
        instructions={[
          "Drag and drop 'string firstName =' and input a value wrapped in quotes.",
          "Drag and drop 'number age =' and input a numeric value.",
          "Drag and drop 'string lastName =' and input a value wrapped in quotes.",
          'Drag and drop "display firstName" to display the value of firstName.',
          'Drag and drop "display age" to display the value of age.',
          'Drag and drop "display lastName" to display the value of lastName.',
        ]}
        handlePlay={handlePlayLesson5}
        dotLottieRef={dotLottieRef}
        outputAnimation={character}
        handleNextStep={(workspace) =>
          handleNextStepLesson5(
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
