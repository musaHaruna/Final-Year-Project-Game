import React, { useState } from 'react'

const quizQuestions = [
  {
    question: "What does 'print' do in programming?",
    options: [
      'It prints out paper',
      'It shows text on the screen',
      'It makes a sound',
      'It draws pictures',
    ],
    correctAnswer: 'It shows text on the screen',
  },
  {
    question: 'Which of the following is a programming language?',
    options: ['Python', 'HTML', 'Java', 'All of the above'],
    correctAnswer: 'All of the above',
  },
  {
    question: 'What is a variable in programming?',
    options: [
      'A place to store data',
      'A type of bug',
      'A command to print text',
      'A game character',
    ],
    correctAnswer: 'A place to store data',
  },
  {
    question: 'What do you use to write code?',
    options: [
      'A text editor',
      'A word processor',
      'A web browser',
      'A drawing app',
    ],
    correctAnswer: 'A text editor',
  },
  {
    question: 'What is an algorithm?',
    options: [
      'A type of computer',
      'A step-by-step solution',
      'A programming language',
      'A type of math',
    ],
    correctAnswer: 'A step-by-step solution',
  },
]

const Lesson4 = () => {
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
    </div>
  )
}

export default Lesson4
