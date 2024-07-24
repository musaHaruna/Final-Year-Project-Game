import React from 'react'
import Lesson from '../../../../code-editor/Lesson'

const elements = [{ variable: 'number A =' }, { variable: 'number B =' }]

const handlePlayLesson3 = (workspace, setOutput) => {
  let variables = {}
  let errors = []

  const requiredVariables = [
    { type: 'number A =', found: false, value: '' },
    { type: 'number B =', found: false, value: '' },
  ]

  workspace.forEach((item) => {
    const match = requiredVariables.find((v) => v.type === item.type)
    if (match) {
      match.found = true
      match.value = item.value.trim()

      if (item.value.trim() === '') {
        errors.push(`Please input a value for ${item.type}`)
      } else if (isNaN(item.value.trim())) {
        errors.push(
          `Variable ${
            item.type
          } expects a number, but got: ${item.value.trim()}`
        )
      } else {
        variables[item.type.split('=')[0].trim()] = {
          type: 'number',
          value: parseFloat(item.value.trim()),
        }
      }
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
  } else {
    setOutput(`Congratulations! You have successfully stored the variables.`)
  }
}

const Lesson3 = () => (
  <Lesson elements={elements} handlePlay={handlePlayLesson3} />
)

export default Lesson3
