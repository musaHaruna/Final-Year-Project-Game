import React from 'react'
import Lesson from '../../../../code-editor/Lesson'

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

const handlePlayLesson5 = (workspace, setOutput) => {
  let variables = {}
  let errors = []

  const requiredVariables = [
    { type: 'string firstName =', found: false, value: '' },
    { type: 'number age =', found: false, value: '' },
    { type: 'string lastName =', found: false, value: '' },
  ]

  const requiredOutputs = [
    { type: 'display firstName', found: false },
    { type: 'display age', found: false },
    { type: 'display lastName', found: false },
  ]

  workspace.forEach((item) => {
    const matchVar = requiredVariables.find((v) => v.type === item.type)
    const matchOutput = requiredOutputs.find((v) => v.type === item.type)

    if (matchVar) {
      matchVar.found = true
      matchVar.value = item.value.trim()

      if (item.value.trim() === '') {
        errors.push(`Please input a value for ${item.type}`)
      } else if (
        matchVar.type.startsWith('number') &&
        isNaN(item.value.trim())
      ) {
        errors.push(
          `Variable ${
            item.type
          } expects a number, but got: ${item.value.trim()}`
        )
      } else if (
        matchVar.type.startsWith('string') &&
        (!item.value.trim().startsWith('"') || !item.value.trim().endsWith('"'))
      ) {
        errors.push(
          `Variable ${
            item.type
          } expects a string wrapped in quotes, but got: ${item.value.trim()}`
        )
      } else {
        variables[item.type.split('=')[0].trim()] = {
          type: matchVar.type.startsWith('number') ? 'number' : 'string',
          value: matchVar.type.startsWith('number')
            ? parseFloat(item.value.trim())
            : item.value.trim().slice(1, -1), // remove quotes
        }
      }
    } else if (matchOutput) {
      matchOutput.found = true
      alert(`Correct output command: ${item.type}`)
    } else {
      errors.push(`Unexpected variable type or output command: ${item.type}`)
    }
  })

  requiredVariables.forEach((variable) => {
    if (!variable.found) {
      errors.push(
        `Missing required variable: ${variable.type}. Perhaps you used the wrong variable type?`
      )
    }
  })

  requiredOutputs.forEach((output) => {
    if (!output.found) {
      errors.push(
        `Missing required output command: ${output.type}. Perhaps you used the wrong output command?`
      )
    }
  })

  if (errors.length > 0) {
    setOutput(`Errors: ${errors.join('; ')}`)
  } else {
    const displayResults = requiredOutputs
      .map(
        (output) =>
          `${output.type.split(' ')[1]}: ${
            variables[output.type.split(' ')[1]].value
          }`
      )
      .join(', ')
    setOutput(
      `Congratulations! You have successfully stored the variables and displayed the results: ${displayResults}`
    )
  }
}

const Lesson5 = () => (
  <Lesson elements={elements} handlePlay={handlePlayLesson5} />
)

export default Lesson5
