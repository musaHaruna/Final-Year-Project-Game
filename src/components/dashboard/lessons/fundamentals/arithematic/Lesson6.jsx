import React, { useState } from 'react'
import Lottie from 'react-lottie-player'
import successAnimation from '../../../../../assets/animations/encouragements/excellent.json'
import tryAgainAnimation from '../../../../../assets/animations/encouragements/try-again.json'
import correctSound from '../../../../../assets/sounds/encouragement/success.mp3'
import wrongSound from '../../../../../assets/sounds/encouragement/error.mp3'

const quizQuestions = [
  {
    question: 'Match the correct definitions about variables and arithmetic.',
    leftOptions: [
      'A variable can hold a number we want to use in calculations.',
      'We can add or subtract values stored in variables.',
      'Using variables helps us keep track of scores in games.',
      'A variable can change its value whenever we need.',
    ],
    rightOptions: [
      'hold a number',
      'add or subtract',
      'track scores',
      'change value',
    ],
  },
  {
    question: 'Match the arithmetic operations with their descriptions.',
    leftOptions: [
      'Addition is when we put two numbers together.',
      'Subtraction is when we take one number away from another.',
      'Multiplication is like repeated addition.',
      'Division is splitting a number into equal parts.',
    ],
    rightOptions: [
      'put together',
      'take away',
      'repeated addition',
      'split into parts',
    ],
  },
]

const Lesson6 = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedLeftOption, setSelectedLeftOption] = useState(null)
  const [selectedRightOption, setSelectedRightOption] = useState(null)
  const [matches, setMatches] = useState({})
  const [score, setScore] = useState(0)
  const [feedbackMessage, setFeedbackMessage] = useState('')
  const [quizFinished, setQuizFinished] = useState(false)
  const [lottieAnimation, setLottieAnimation] = useState(null)
  const [lottieVisible, setLottieVisible] = useState(false)

  // Play sound effects
  const playSound = (sound) => {
    new Audio(sound).play()
  }

  // Check if the selected pair matches correctly
  const handleSelection = (type, option) => {
    if (type === 'left') {
      setSelectedLeftOption(option)
      setSelectedRightOption(null) // Reset right option
    } else {
      setSelectedRightOption(option)
    }

    if (selectedLeftOption && type === 'right') {
      const correctIndex =
        quizQuestions[currentQuestion].leftOptions.indexOf(selectedLeftOption)
      const correctMatch =
        quizQuestions[currentQuestion].rightOptions[correctIndex]

      if (option === correctMatch) {
        setFeedbackMessage('Correct!')
        playSound(correctSound)
        setScore((prevScore) => prevScore + 1)
      } else {
        setFeedbackMessage(
          'Wrong! The correct answer for "' +
            selectedLeftOption +
            '" is "' +
            correctMatch +
            '".'
        )
        playSound(wrongSound)
      }

      // Update matches state
      setMatches((prevMatches) => ({
        ...prevMatches,
        [selectedLeftOption]: {
          option,
          isCorrect: option === correctMatch,
        },
      }))

      setLottieAnimation(
        option === correctMatch ? successAnimation : tryAgainAnimation
      )
      setLottieVisible(true)

      // Hide Lottie animation after 2 seconds
      setTimeout(() => {
        setLottieVisible(false)
        setSelectedLeftOption(null)
        setSelectedRightOption(null)
        setFeedbackMessage('')
      }, 2000)
    }
  }

  const handleNextQuestion = () => {
    const nextQuestion = currentQuestion + 1
    if (nextQuestion < quizQuestions.length) {
      setCurrentQuestion(nextQuestion)
      setSelectedLeftOption(null)
      setSelectedRightOption(null)
      setFeedbackMessage('')
      setMatches({}) // Reset matches for the next question
    } else {
      setQuizFinished(true)
    }
  }

  const handlePreviousQuestion = () => {
    const previousQuestion = currentQuestion - 1
    if (previousQuestion >= 0) {
      setCurrentQuestion(previousQuestion)
      setSelectedLeftOption(null)
      setSelectedRightOption(null)
      setFeedbackMessage('')
      setMatches({}) // Reset matches for the previous question
    }
  }

  const restartQuiz = () => {
    setCurrentQuestion(0)
    setScore(0)
    setMatches({})
    setSelectedLeftOption(null)
    setSelectedRightOption(null)
    setFeedbackMessage('')
    setQuizFinished(false)
  }

  return (
    <div className='max-w-md mx-auto p-4'>
      <h2 className='text-3xl font-bold text-center mb-6'>Matching Quiz</h2>

      {quizFinished ? (
        <div className='text-center'>
          <h3 className='text-2xl font-semibold mb-4'>Quiz Finished!</h3>
          <p className='text-lg'>
            Your final score is <span className='font-bold'>{score}</span> out
            of {quizQuestions.length}.
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
            <div className='text-center mb-2'>
              <p className='font-semibold'>
                {quizQuestions[currentQuestion].question}
              </p>
            </div>
            <div className='flex justify-between'>
              {/* Left Column */}
              <div className='flex flex-col items-start space-y-2'>
                {quizQuestions[currentQuestion].leftOptions.map(
                  (leftOption, index) => (
                    <div
                      key={index}
                      className={`p-3 border rounded cursor-pointer transition-all duration-200 ${
                        matches[leftOption]?.isCorrect
                          ? 'bg-green-200'
                          : matches[leftOption]
                          ? 'bg-red-200'
                          : ''
                      }`}
                      onClick={() => handleSelection('left', leftOption)}
                    >
                      {leftOption}
                    </div>
                  )
                )}
              </div>

              {/* Right Column */}
              <div className='flex flex-col items-end space-y-2'>
                {quizQuestions[currentQuestion].rightOptions.map(
                  (rightOption, index) => (
                    <div
                      key={index}
                      className={`p-3 border rounded cursor-pointer transition-all duration-200 ${
                        matches[
                          Object.keys(matches).find(
                            (key) => matches[key]?.option === rightOption
                          )
                        ]?.isCorrect
                          ? 'bg-blue-200'
                          : matches[
                              Object.keys(matches).find(
                                (key) => matches[key]?.option === rightOption
                              )
                            ]
                          ? 'bg-red-200'
                          : ''
                      }`}
                      onClick={() => handleSelection('right', rightOption)}
                    >
                      {rightOption}
                    </div>
                  )
                )}
              </div>
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
              <p className='font-semibold'>{feedbackMessage}</p>
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

export default Lesson6
