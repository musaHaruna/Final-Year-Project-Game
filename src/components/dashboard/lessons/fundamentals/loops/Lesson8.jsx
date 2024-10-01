import React, { useState } from 'react'

const quizQuestions = [
  {
    question: 'What is a loop in programming?',
    options: [
      'A way to repeat instructions',
      'A command to store data',
      'A method to turn off the computer',
      'A tool for creating pictures',
    ],
    correctAnswer: 'A way to repeat instructions',
  },
  {
    question: 'Why do we use loops in programming?',
    options: [
      'To make our code shorter and easier to manage',
      'To add more instructions to the code',
      'To make the computer run slower',
      'To stop the computer from working',
    ],
    correctAnswer: 'To make our code shorter and easier to manage',
  },
  {
    question: 'What is a “for” loop used for?',
    options: [
      'To repeat a set of instructions a specific number of times',
      'To check conditions only once',
      'To change variables randomly',
      'To create graphics on the screen',
    ],
    correctAnswer: 'To repeat a set of instructions a specific number of times',
  },
  {
    question: 'What does a “while” loop do?',
    options: [
      'Repeats instructions as long as a condition is true',
      'Runs instructions only once',
      'Creates new variables',
      'Stops the program from running',
    ],
    correctAnswer: 'Repeats instructions as long as a condition is true',
  },
  {
    question: 'Which of the following is an example of using a loop?',
    options: [
      'Counting from 1 to 10',
      'Storing data in a variable',
      'Printing a single message',
      'Turning the computer off',
    ],
    correctAnswer: 'Counting from 1 to 10',
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
