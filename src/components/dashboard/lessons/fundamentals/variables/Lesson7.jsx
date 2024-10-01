import React, { useState, useEffect } from 'react'
import Lottie from 'react-lottie-player'
import successAnimation from '../../../../../assets/animations/encouragements/excellent.json'
import tryAgainAnimation from '../../../../../assets/animations/encouragements/try-again.json'
import correctSound from '../../../../../assets/sounds/encouragement/success.mp3'
import wrongSound from '../../../../../assets/sounds/encouragement/error.mp3'
import dragSound from '../../../../../assets/sounds/generic/click.mp3'
import dropSound from '../../../../../assets/sounds/generic/drop.mp3'

const quizQuestions = [
  {
    question: 'A variable is like a box that can hold _____ inside it.',
    correctAnswer: 'data',
    dragOptions: ['data', 'toys', 'words', 'numbers'],
  },
  {
    question: 'We can _____ the value of a variable whenever we want.',
    correctAnswer: 'change',
    dragOptions: ['change', 'ignore', 'create', 'lose'],
  },
  {
    question: 'To keep track of how many points we have, we use a _____.',
    correctAnswer: 'variable',
    dragOptions: ['variable', 'loop', 'function', 'number'],
  },
  {
    question: 'Variables help us remember important _____.',
    correctAnswer: 'information',
    dragOptions: ['information', 'colors', 'games', 'pictures'],
  },
]


const Lesson7 = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [score, setScore] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState('')
  const [feedbackMessage, setFeedbackMessage] = useState('')
  const [quizFinished, setQuizFinished] = useState(false)
  const [lottieAnimation, setLottieAnimation] = useState(null)
  const [lottieVisible, setLottieVisible] = useState(false)

  // Play sound effects
  const playSound = (sound) => {
    new Audio(sound).play()
  }

  const handleDrop = (event) => {
    event.preventDefault()
    const droppedAnswer = event.dataTransfer.getData('text')

    playSound(dropSound)

    if (droppedAnswer === quizQuestions[currentQuestion].correctAnswer) {
      setFeedbackMessage('Correct!')
      playSound(correctSound)
      setLottieAnimation(successAnimation)
      setScore((prevScore) => prevScore + 1)
    } else {
      setFeedbackMessage(
        'Wrong! The correct answer is: ' +
          quizQuestions[currentQuestion].correctAnswer
      )
      playSound(wrongSound)
      setLottieAnimation(tryAgainAnimation)
    }

    setSelectedAnswer(droppedAnswer)
    setLottieVisible(true)

    // Hide Lottie animation after 2 seconds
    setTimeout(() => {
      setLottieVisible(false)
    }, 2000)
  }

  const handleDragOver = (event) => {
    event.preventDefault()
  }

  const handleDragStart = () => {
    playSound(dragSound)
  }

  const handleNextQuestion = () => {
    const nextQuestion = currentQuestion + 1
    if (nextQuestion < quizQuestions.length) {
      setCurrentQuestion(nextQuestion)
      setSelectedAnswer('')
      setFeedbackMessage('')
    } else {
      setQuizFinished(true)
    }
  }

  const handlePreviousQuestion = () => {
    const previousQuestion = currentQuestion - 1
    if (previousQuestion >= 0) {
      setCurrentQuestion(previousQuestion)
      setSelectedAnswer('')
      setFeedbackMessage('')
    }
  }

  const restartQuiz = () => {
    setCurrentQuestion(0)
    setScore(0)
    setSelectedAnswer('')
    setFeedbackMessage('')
    setQuizFinished(false)
  }

  return (
    <div className='max-w-md mx-auto p-4'>
      <h2 className='text-2xl font-semibold text-center mb-4'>
        Drag and Drop Quiz
      </h2>

      {quizFinished ? (
        <div className='text-center'>
          <h3 className='text-2xl font-semibold mb-4'>Quiz Finished!</h3>
          <p className='text-lg'>
            Your final score is {score} out of {quizQuestions.length}.
          </p>
          <button
            onClick={restartQuiz}
            className='mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600'
          >
            Retake Quiz
          </button>
        </div>
      ) : (
        <>
          <div className='mb-4'>
            <p className='text-lg'>{quizQuestions[currentQuestion].question}</p>
            <div
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              className='mb-4 border border-gray-300 p-4 text-center'
            >
              {selectedAnswer ? (
                <span className='font-bold text-green-500'>
                  {selectedAnswer}
                </span>
              ) : (
                <span className='font-bold'>_____</span>
              )}
            </div>
            <div className='flex space-x-2'>
              {quizQuestions[currentQuestion].dragOptions.map(
                (option, index) => (
                  <div
                    key={index}
                    draggable
                    onDragStart={(event) => {
                      event.dataTransfer.setData('text', option)
                      handleDragStart()
                    }}
                    className='bg-gray-300 rounded p-2 cursor-pointer'
                  >
                    {option}
                  </div>
                )
              )}
            </div>
          </div>

          {/* Lottie Animation */}
          {lottieVisible && (
            <div className='fixed inset-0 flex items-center justify-center bg-slate-800 bg-opacity-45'>
              <Lottie
                loop={false}
                play
                animationData={lottieAnimation}
                style={{ width: 150, height: 150, margin: '0 auto' }}
              />
            </div>
          )}

          {/* Feedback */}
          {feedbackMessage && (
            <div className='text-center mt-4'>
              <p>{feedbackMessage}</p>
            </div>
          )}

          {/* Navigation and Score */}
          <div className='flex justify-between mt-4'>
            <button
              onClick={handlePreviousQuestion}
              className='px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600'
              disabled={currentQuestion === 0}
            >
              Back
            </button>

            <p className='text-lg font-bold'>Score: {score}</p>

            <button
              onClick={handleNextQuestion}
              className='px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600'
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  )
}

export default Lesson7
