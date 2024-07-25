import React from 'react'
import Lesson from '../../../../code-editor/Lesson'

const elements = [
  { variable: 'string A =' },
  { variable: 'string B =' },
  { output: 'display A' },
  { output: 'display B' },
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
  setStepFeedback
) => {
  const steps = ['string A =', 'string B =', 'display A', 'display B']

  if (
    stepIndex < steps.length &&
    workspace[stepIndex]?.type === steps[stepIndex]
  ) {
    alert(`Good job! You completed step ${stepIndex + 1}`)
    setStepIndex(stepIndex + 1)
  } else {
    setStepFeedback('')
  }
}

const Lesson4 = () => (
  <Lesson
    elements={elements}
    handlePlay={handlePlayLesson4}
    handleNextStep={handleNextStepLesson4}
  />
)

export default Lesson4
