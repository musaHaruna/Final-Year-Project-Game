import React, { useState, useEffect, useRef } from 'react'
import Lesson from '../../../../code-editor/Lesson'
import Lottie from 'react-lottie'
import successAnimation1 from '../../../../../assets/animations/encouragements/excellent.json'
import successAnimation2 from '../../../../../assets/animations/encouragements/good-job.json'
import successAnimation3 from '../../../../../assets/animations/encouragements/nice.json'
import tryAgainAnimation from '../../../../../assets/animations/encouragements/try-again.json'
import character from '../../../../../assets/animations/fundamentals/character.lottie'

const elements = [
  { variable: 'number A =' },
  { variable: 'number B =' },
  { operation: 'number C = [A] + [B]' },
  { output: 'display C' },
  { conditional: 'if [A] > [B]' },
  { conditional: 'else' },
  { action: 'display "A is greater"' },
  { action: 'display "B is greater or equal"' },
]

const instructions = [
  "Drag and drop 'number A =' and input a value.",
  "Drag and drop 'number B =' and input a value.",
  "Drag and drop 'number C = [A] + [B]' to perform the addition.",
  "Drag and drop 'number C' to display the result.",
  "Drag and drop 'if [A] > [B]' to create a conditional statement.",
  "Drag and drop 'else' to handle the alternative condition.",
  "Drag and drop 'display \"A is greater\"' inside the 'if' block.",
  "Drag and drop 'display \"B is greater or equal\"' inside the 'else' block.",
]

const successMessage =
  'Congratulations! You have successfully stored the variables and performed the addition:'

const Lesson3 = () => {
  const [stepIndex, setStepIndex] = useState(0)
  const [animationData, setAnimationData] = useState(null)
  const [startAnimation, setStartAnimation] = useState('')
  const dotLottieRef = useRef(null)

  const handlePlayLesson4 = (workspace, setOutput) => {
    let variables = {}
    let errors = []
    let displayC = false
    let conditionalBlock = null
    let elseBlock = null

    workspace.forEach((item) => {
      if (item.type === 'number A =' || item.type === 'number B =') {
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
      } else if (item.type === 'number C = [A] + [B]') {
        if (!variables['number A'] || !variables['number B']) {
          errors.push(
            `Define both 'number A =' and 'number B =' before using 'number C ='`
          )
        } else {
          variables['number C'] = {
            type: 'number',
            value: variables['number A'].value + variables['number B'].value,
          }
        }
      } else if (item.type === 'display C') {
        displayC = true
      } else if (item.type.startsWith('if ')) {
        const condition = item.type
          .slice(3)
          .replace(
            /\[([A-Z])\]/g,
            (_, p1) => variables[`number ${p1}`]?.value || 0
          )
        try {
          conditionalBlock = {
            condition: eval(condition),
            actions: [],
          }
        } catch (e) {
          errors.push(`Invalid condition: ${item.type}`)
        }
      } else if (item.type === 'else') {
        elseBlock = {
          actions: [],
        }
      } else if (item.type.startsWith('display ')) {
        if (conditionalBlock && !elseBlock) {
          conditionalBlock.actions.push(item.type.slice(8).replace(/"/g, ''))
        } else if (elseBlock) {
          elseBlock.actions.push(item.type.slice(8).replace(/"/g, ''))
        } else {
          errors.push(`'display' actions should be inside a conditional block`)
        }
      } else {
        errors.push(`Unexpected variable type: ${item.type}`)
      }
    })

    if (errors.length > 0) {
      setOutput(`Errors: ${errors.join('; ')}`)
    } else {
      let result = ''
      if (conditionalBlock) {
        if (conditionalBlock.condition) {
          result += conditionalBlock.actions.join(' ') + '. '
        } else if (elseBlock) {
          result += elseBlock.actions.join(' ') + '. '
        }
      }

      if (displayC) {
        const cValue = variables['number C']?.value
        result += `${successMessage} C = ${cValue}`
        setStartAnimation(successMessage)
      }

      setOutput(result)
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
      'number A =',
      'number B =',
      'number C = [A] + [B]',
      'number C',
      'if [A] > [B]',
      'display "A is greater"',
      'else',
      'display "B is greater or equal"',
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
        Storing values in a variable and Using Conditionals
      </h2>
      <p className='text-center'>
        <span className='font-bold'>Mission:</span> Store variables, perform
        addition, and use conditionals
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

export default Lesson3
