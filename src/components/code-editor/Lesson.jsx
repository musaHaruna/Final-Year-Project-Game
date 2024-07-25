import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Workspace from './Workspace'
import Output from './Output'
import ControlButtons from './ControlButtons'
import Toolbar from './Toolbar'

const Lesson = ({ elements, handlePlay, handleNextStep, instructions }) => {
  const [workspace, setWorkspace] = useState([])
  const [output, setOutput] = useState(null)
  const [history, setHistory] = useState([])
  const [stepIndex, setStepIndex] = useState(0)
  const [stepFeedback, setStepFeedback] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(true)
  const [isToolbarVisible, setIsToolbarVisible] = useState(false)

  useEffect(() => {
    setIsModalOpen(true)
  }, [])

  const handleDrop = (e) => {
    e.preventDefault()
    const data = e.dataTransfer.getData('text')
    const newWorkspace = [...workspace, { type: data, value: '' }]
    setHistory([...history, workspace])
    setWorkspace(newWorkspace)
  }

  const handleDragStart = (e, item) => {
    e.dataTransfer.setData('text', item)
  }

  const handleReset = () => {
    setHistory([...history, workspace])
    setWorkspace([])
    setOutput(null)
    setStepIndex(0)
    setStepFeedback('')
  }

  const handleUndo = () => {
    if (history.length > 0) {
      const previousWorkspace = history[history.length - 1]
      setWorkspace(previousWorkspace)
      setHistory(history.slice(0, -1))
    }
  }

  const handleChange = (index, newValue) => {
    const newWorkspace = workspace.map((item, i) => {
      if (i === index) {
        return { ...item, value: newValue }
      }
      return item
    })
    setHistory([...history, workspace])
    setWorkspace(newWorkspace)
  }

  return (
    <div className='mx-auto p-4'>
      <div className='flex space-x-8'>
        <Workspace
          workspace={workspace}
          handleDrop={handleDrop}
          handleChange={handleChange}
        />
        <Output output={output} />
      </div>

      <ControlButtons
        handleReset={handleReset}
        handleUndo={handleUndo}
        handlePlay={() => handlePlay(workspace, setOutput)}
        handleCheckStep={() =>
          handleNextStep(workspace, stepIndex, setStepIndex, setStepFeedback)
        }
      />

      {isToolbarVisible && (
        <div
          className='mt-8 bg-slate-300 p-7'
          style={{
            position: 'absolute',
            top: '23rem',
            height:"150px",
            borderRadius:"10px",
            backgroundColor: '',
            zIndex: '9',
            overflowX: 'hidden',
            overflowY: 'scroll',
            width: '90%',
          }}
          initial={{ y: 100 }}
          animate={{ y: isToolbarVisible ? 0 : 100 }}
          transition={{ type: 'spring', stiffness: 300 }}
        >
          <Toolbar elements={elements} handleDragStart={handleDragStart} />
        </div>
      )}

      <button
        className='fixed z-50 bottom-10 right-10 p-2 bg-gray-200 rounded-full hover:bg-gray-300'
        onClick={() => setIsToolbarVisible(!isToolbarVisible)}
      >
        {isToolbarVisible ? (
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className='w-6 h-6'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M19.5 14.25l-7.5-7.5-7.5 7.5'
            />
          </svg>
        ) : (
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className='w-6 h-6'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M19.5 9.75l-7.5 7.5-7.5-7.5'
            />
          </svg>
        )}
      </button>

      {stepFeedback && (
        <div className='mt-4 p-2 bg-green-200 text-green-800 rounded'>
          {stepFeedback}
        </div>
      )}

      {isModalOpen && (
        <div className='fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center z-50'>
          <div className='bg-white rounded-lg p-8 w-11/12 md:w-2/3 lg:w-1/2'>
            <h3 className='text-xl font-medium mb-4'>Instructions</h3>
            <ol className='list-decimal list-inside'>
              {instructions.map((instruction, index) => (
                <li key={index} className='mb-2'>
                  {instruction}
                </li>
              ))}
            </ol>
            <button
              className='mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700'
              onClick={() => setIsModalOpen(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}

      <button
        className='absolute top-8 left p-2 bg-gray-200 rounded-full hover:bg-gray-300'
        onClick={() => setIsModalOpen(true)}
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth={1.5}
          stroke='currentColor'
          className='w-6 h-6'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M12 4.5v15m7.5-7.5h-15'
          />
        </svg>
      </button>
    </div>
  )
}

export default Lesson
