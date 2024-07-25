import React, { useState, useEffect } from 'react'
import Lesson from '../../../../code-editor/Lesson'
import Lottie from 'react-lottie'
import successAnimation1 from '../../../../../assets/animations/encouragements/excellent.json'
import successAnimation2 from '../../../../../assets/animations/encouragements/good-job.json'
import successAnimation3 from '../../../../../assets/animations/encouragements/nice.json'
import tryAgainAnimation from '../../../../../assets/animations/encouragements/try-again.json'

const elements = [
  { variable: 'string A =' },
  { variable: 'string B =' },
  { output: 'display A' },
  { output: 'display B' },
]

const instructions = [
  "Drag and drop 'string A =' and input a value wrapped in quotes.",
  "Drag and drop 'string B =' and input a value wrapped in quotes.",
  'Drag and drop "display A" to display the value of string A.',
  'Drag and drop "display B" to display the value of string B.',
]

const handlePlayLesson4 = (workspace, setOutput) => {
  let variables = {}
  let errors = []
  let displayA = false
  let displayB = false

  const requiredVariables = [
    { type: 'string A =', found: false, value: '' },
    { type: 'string B =', found: false, value: '' },
  ]

  workspace.forEach((item) => {
    const match = requiredVariables.find((v) => v.type === item.type)
    if (match) {
      match.found = true
      match.value = item.value.trim()

      if (item.value.trim() === '') {
        errors.push(`Please input a value for ${item.type}`)
      } else if (
        !item.value.trim().startsWith('"') ||
        !item.value.trim().endsWith('"')
      ) {
        errors.push(`Value for ${item.type} should be wrapped in quotes`)
      } else {
        variables[item.type.split('=')[0].trim()] = {
          type: 'string',
          value: item.value.trim(),
        }
      }
    } else if (item.type === 'display A') {
      displayA = true
    } else if (item.type === 'display B') {
      displayB = true
    } else {
      errors.push(`Unexpected variable type: ${item.type}`)
    }
  })

  requiredVariables.forEach((variable) => {
    if (!variable.found) {
      errors.push(`Missing required variable: ${variable.type}`)
    }
  })

  if (errors.length > 0) {
    setOutput(`Errors: ${errors.join('; ')}`)
  } else if (displayA && displayB) {
    const result = Object.entries(variables)
      .map(([key, { type, value }]) => `${key} = ${value} (${type})`)
      .join(', ')
    setOutput(
      `Congratulations! You have successfully stored the variables: ${result}`
    )
  } else {
    setOutput(`Please use "display A" and "display B" to display the variables`)
  }
}

const handleNextStepLesson4 = (
  workspace,
  stepIndex,
  setStepIndex,
  setAnimationData
) => {
  const steps = ['string A =', 'string B =', 'display A', 'display B']

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

const Lesson4 = () => {
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
        Storing values in a variable
      </h2>
      <p className='text-center'>
        <span className='font-bold'>Mission:</span> Store variables in
        programming
      </p>
      <Lesson
        elements={elements}
        instructions={instructions}
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

export default Lesson4
