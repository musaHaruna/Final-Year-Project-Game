import React, { useState, useEffect, useRef } from 'react'
import Lesson from '../code-editor/Lesson'
import Lottie from 'react-lottie'
import successAnimation1 from '../../assets/animations/encouragements/excellent.json'
import successAnimation2 from '../../assets/animations/encouragements/good-job.json'
import successAnimation3 from '../../assets/animations/encouragements/nice.json'
import tryAgainAnimation from '../../assets/animations/encouragements/try-again.json'
import character from '../../assets/animations/fundamentals/character.lottie'

const elements = [{ variable: 'number A =' }, { variable: 'number B =' }]
const instructions = [
  "Drag and drop 'number A =' and input a value.",
  "Drag and drop 'number B =' and input a value.",
  'Click PLAY to see the declared variables in the output.',
]

const Lesson3 = () => {
  const [stepIndex, setStepIndex] = useState(0)
  const [animationData, setAnimationData] = useState(null)
  const [output, setOutput] = useState(null)
  const dotLottieRef = useRef(null)

  const successMessage =
    'Congratulations! You have successfully stored the variables.'

  const handlePlayLesson3 = (workspace) => {
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
      setOutput(successMessage)
    }
  }

  useEffect(() => {
    if (dotLottieRef.current) {
      if (output === successMessage) {
        dotLottieRef.current.play()
      } else {
        dotLottieRef.current.stop()
      }
    }
  }, [output, dotLottieRef, successMessage])

  const handleNextStepLesson3 = (workspace) => {
    const steps = ['number A =', 'number B =']

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
        dotLottieRef={dotLottieRef}
        outputAnimationFunction={() => {
          if (dotLottieRef.current) {
            dotLottieRef.current.play()
          }
        }}
        outputAnimation={character}
        instructions={instructions}
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
          <Lottie
            options={{
              loop: true,
              autoplay: true,
              animationData,
              rendererSettings: {
                preserveAspectRatio: 'xMidYMid slice',
              },
            }}
            height={400}
            width={400}
          />
        </div>
      )}
    </div>
  )
}

export default Lesson3
