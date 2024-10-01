import React, { useState } from 'react'

const quizQuestions = [
  {
    question: 'What is a variable in programming?',
    options: [
      'A box that holds information',
      'A command to shut down the computer',
      'A type of video game',
      'A way to connect to the internet',
    ],
    correctAnswer: 'A box that holds information',
  },
  {
    question: 'What can we put inside a variable?',
    options: [
      'Numbers and words',
      'Only pictures',
      'Just games',
      'Nothing at all',
    ],
    correctAnswer: 'Numbers and words',
  },
  {
    question: 'Why do we use variables?',
    options: [
      'To remember things in our programs',
      'To make the computer faster',
      'To keep the computer warm',
      'To make videos',
    ],
    correctAnswer: 'To remember things in our programs',
  },
  {
    question: 'How can we change the value of a variable?',
    options: [
      'By giving it a new value',
      'By turning off the computer',
      'By closing the program',
      'By waiting for a long time',
    ],
    correctAnswer: 'By giving it a new value',
  },
  {
    question: 'What happens if we don’t use variables?',
    options: [
      'It’s hard to remember important information',
      'The computer won’t work at all',
      'We will have more fun',
      'Everything will be faster',
    ],
    correctAnswer: 'It’s hard to remember important information',
  },
]

const Lesson8 = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [score, setScore] = useState(0)
  const [showScore, setShowScore] = useState(false)
  const [selectedAnswer, setSelectedAnswer] = useState('')
  const [feedbackModalOpen, setFeedbackModalOpen] = useState(false)
  const [feedbackMessage, setFeedbackMessage] = useState('')

  const handleAnswerClick = (answer) => {
    setSelectedAnswer(answer)
    if (answer === quizQuestions[currentQuestion].correctAnswer) {
      setScore(score + 1)
      setFeedbackMessage('Correct!')
    } else {
      setFeedbackMessage('Wrong!')
    }

    // Open the feedback modal only if it's not the last question
    if (currentQuestion < quizQuestions.length - 1) {
      setFeedbackModalOpen(true)
    } else {
      handleNextQuestion() // Directly move to the score display if it's the last question
    }
  }

  const handleNextQuestion = () => {
    const nextQuestion = currentQuestion + 1
    if (nextQuestion < quizQuestions.length) {
      setCurrentQuestion(nextQuestion)
      setSelectedAnswer('')
      setFeedbackModalOpen(false) // Close feedback modal for the next question
    } else {
      setShowScore(true)
    }
  }

  const handlePreviousQuestion = () => {
    const previousQuestion = currentQuestion - 1
    if (previousQuestion >= 0) {
      setCurrentQuestion(previousQuestion)
      setSelectedAnswer('')
      setFeedbackModalOpen(false) // Close feedback modal when going back
    }
  }

  const closeModal = () => {
    setFeedbackModalOpen(false)
  }

  const restartQuiz = () => {
    setCurrentQuestion(0)
    setScore(0)
    setShowScore(false)
    setSelectedAnswer('')
    setFeedbackModalOpen(false)
  }

  return (
    <div className='max-w-md mx-auto'>
      <div className='text-white p-4'>
        <h2 className='text-2xl font-semibold text-center text-gray-700'>
          Unit 1 Quiz
        </h2>
      </div>
      <div className='p-4'>
        {showScore ? (
          <div className='text-center'>
            <p className='text-xl mb-4'>
              You scored {score} out of {quizQuestions.length}!
            </p>
            <button
              onClick={restartQuiz}
              className='px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600'
            >
              Restart Quiz
            </button>
          </div>
        ) : (
          <>
            <p className='text-lg mb-4'>
              Question {currentQuestion + 1}/{quizQuestions.length}
            </p>
            <p className='text-xl mb-4'>
              {quizQuestions[currentQuestion].question}
            </p>
            <div className='space-y-2'>
              {quizQuestions[currentQuestion].options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswerClick(option)}
                  className={`w-full px-4 py-2 rounded ${
                    selectedAnswer === option
                      ? option === quizQuestions[currentQuestion].correctAnswer
                        ? 'bg-green-500'
                        : 'bg-red-500'
                      : option ===
                          quizQuestions[currentQuestion].correctAnswer &&
                        selectedAnswer !== ''
                      ? 'bg-green-300'
                      : 'bg-gray-300'
                  } hover:bg-gray-400`}
                >
                  {option}
                </button>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Show navigation buttons only if the quiz is not completed */}
      {!showScore && (
        <div className='flex justify-between'>
          <button
            onClick={handlePreviousQuestion}
            className='px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600'
          >
            Back
          </button>
          <button
            onClick={handleNextQuestion}
            className='px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600'
          >
            Next Question
          </button>
        </div>
      )}
    </div>
  )
}

export default Lesson8
