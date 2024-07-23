import React, { useState } from 'react'
import { evaluate } from 'mathjs'

const Lesson4 = () => {
  const [workspace, setWorkspace] = useState([])
  const [output, setOutput] = useState(null)
  const [step, setStep] = useState(1)
  const [history, setHistory] = useState([])

  const handleDrop = (e) => {
    e.preventDefault()
    const data = e.dataTransfer.getData('text')
    const newWorkspace = [...workspace, { type: data, value: '' }]
    setHistory([...history, workspace])
    setWorkspace(newWorkspace)
    checkStep(data)
  }

  const handleDragStart = (e, item) => {
    e.dataTransfer.setData('text', item)
  }

  const handleReset = () => {
    setWorkspace([])
    setOutput(null)
    setStep(1)
    setHistory([])
  }

  const handleUndo = () => {
    if (history.length > 0) {
      const previousWorkspace = history[history.length - 1]
      setWorkspace(previousWorkspace)
      setHistory(history.slice(0, -1))
    }
  }

  const handlePlay = () => {
    let variables = {}
    let expression = ''

    workspace.forEach((item) => {
      if (item.type.includes('=')) {
        const [varName, expr] = item.type.split('=')
        variables[varName.trim()] = parseFloat(item.value)
      } else if (item.type.includes('RESULT')) {
        expression = item.type.replace('RESULT =', '').trim()
      }
    })

    Object.keys(variables).forEach((varName) => {
      expression = expression.replace(
        new RegExp(varName, 'g'),
        variables[varName]
      )
    })

    try {
      const result = evaluate(expression)
      setOutput(`The result of the expression is: ${result}`)
    } catch (error) {
      setOutput('Error in evaluating the expression.')
    }
  }

  const handleChange = (index, newValue) => {
    const newWorkspace = workspace.map((item, i) => {
      if (i === index) {
        return { ...item, value: newValue }
      }
      return item
    })
    setWorkspace(newWorkspace)
  }

  const checkStep = (data) => {
    switch (step) {
      case 1:
        if (data.includes('A =')) {
          alert('Good job! Now drag and drop variable B.')
          setStep(2)
        } else {
          alert('Try again! Drag and drop variable A first.')
        }
        break
      case 2:
        if (data.includes('B =')) {
          alert('Great! Now drag and drop variable C.')
          setStep(3)
        } else {
          alert('Try again! Drag and drop variable B.')
        }
        break
      case 3:
        if (data.includes('C =')) {
          alert('Excellent! Now drag and drop the RESULT = A + B + C.')
          setStep(4)
        } else {
          alert('Try again! Drag and drop variable C.')
        }
        break
      case 4:
        if (data.includes('RESULT = A + B + C')) {
          alert('Well done! Now click PLAY to see the result.')
          setStep(5)
        } else {
          alert('Try again! Drag and drop the RESULT = A + B + C.')
        }
        break
      default:
        break
    }
  }

  return (
    <div className='container mx-auto p-4'>
      <h2 className='text-xl font-medium mb-4'>
        Drag and drop elements to declare variables, perform operations, and
        store results.
      </h2>
      <div className='flex space-x-8'>
        {/* Workspace Panel */}
        <div
          className='w-1/2 p-4 border border-gray-300 rounded-md'
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
        >
          <h2 className='text-lg font-medium mb-2'>Workspace</h2>
          {workspace.map((item, index) => (
            <div
              key={index}
              className='p-2 bg-gray-100 border border-gray-300 rounded-md mb-2 flex items-center'
            >
              {item.type.includes('=') && !item.type.includes('RESULT') ? (
                <>
                  {item.type}
                  <input
                    type='text'
                    value={item.value}
                    onChange={(e) => handleChange(index, e.target.value)}
                    className='p-2 border border-gray-300 rounded-md ml-2'
                  />
                </>
              ) : (
                item.type
              )}
            </div>
          ))}
        </div>

        {/* Output Panel */}
        <div className='w-1/2 p-4 border border-gray-300 rounded-md'>
          <h2 className='text-lg font-medium mb-2'>Output</h2>
          <div className='p-2 bg-gray-100 border border-gray-300 rounded-md h-16 flex items-center justify-center'>
            {output !== null ? output : 'Output will be displayed here'}
          </div>
        </div>
      </div>

      {/* Control Buttons */}
      <div className='flex space-x-4 mt-4'>
        <button
          onClick={handleReset}
          className='px-4 py-2 bg-gray-500 text-white rounded-md'
        >
          RESET
        </button>
        <button
          onClick={handleUndo}
          className='px-4 py-2 bg-yellow-500 text-white rounded-md'
          disabled={history.length === 0}
        >
          UNDO
        </button>
        <button
          onClick={handlePlay}
          className='px-4 py-2 bg-blue-500 text-white rounded-md'
          disabled={step !== 5}
        >
          PLAY
        </button>
      </div>

      {/* Instructions */}
      <div className='mt-8'>
        <h3 className='text-md font-medium mb-2'>Instructions:</h3>
        <ol className='list-decimal list-inside'>
          <li>Drag and drop variable A and input a number.</li>
          <li>Drag and drop variable B and input a number.</li>
          <li>Drag and drop variable C and input a number.</li>
          <li>Drag and drop the RESULT = A + B + C component.</li>
          <li>Click PLAY to see the result.</li>
        </ol>
      </div>

      {/* Toolbars */}
      <div className='mt-8 flex space-x-8'>
        <div className='w-1/4'>
          <h3 className='text-md font-medium mb-2'>Variables</h3>
          <div
            draggable
            onDragStart={(e) => handleDragStart(e, 'A =')}
            className='p-2 bg-gray-200 border border-gray-300 rounded-md cursor-pointer mb-2'
          >
            A =
          </div>
          <div
            draggable
            onDragStart={(e) => handleDragStart(e, 'B =')}
            className='p-2 bg-gray-200 border border-gray-300 rounded-md cursor-pointer mb-2'
          >
            B =
          </div>
          <div
            draggable
            onDragStart={(e) => handleDragStart(e, 'C =')}
            className='p-2 bg-gray-200 border border-gray-300 rounded-md cursor-pointer mb-2'
          >
            C =
          </div>
        </div>
        <div className='w-1/4'>
          <h3 className='text-md font-medium mb-2'>Operations</h3>
          <div
            draggable
            onDragStart={(e) => handleDragStart(e, 'RESULT = A + B')}
            className='p-2 bg-gray-200 border border-gray-300 rounded-md cursor-pointer mb-2'
          >
            RESULT = A + B
          </div>
          <div
            draggable
            onDragStart={(e) => handleDragStart(e, 'RESULT = A - B')}
            className='p-2 bg-gray-200 border border-gray-300 rounded-md cursor-pointer mb-2'
          >
            RESULT = A - B
          </div>
          <div
            draggable
            onDragStart={(e) => handleDragStart(e, 'RESULT = A * B')}
            className='p-2 bg-gray-200 border border-gray-300 rounded-md cursor-pointer mb-2'
          >
            RESULT = A * B
          </div>
          <div
            draggable
            onDragStart={(e) => handleDragStart(e, 'RESULT = A / B')}
            className='p-2 bg-gray-200 border border-gray-300 rounded-md cursor-pointer mb-2'
          >
            RESULT = A / B
          </div>
          <div
            draggable
            onDragStart={(e) => handleDragStart(e, 'RESULT = A + B + C')}
            className='p-2 bg-gray-200 border border-gray-300 rounded-md cursor-pointer mb-2'
          >
            RESULT = A + B + C
          </div>
          <div
            draggable
            onDragStart={(e) => handleDragStart(e, 'RESULT = A - B + C')}
            className='p-2 bg-gray-200 border border-gray-300 rounded-md cursor-pointer mb-2'
          >
            RESULT = A - B + C
          </div>
        </div>
        <div className='w-1/4'>
          <h3 className='text-md font-medium mb-2'>Output</h3>
          <div
            draggable
            onDragStart={(e) => handleDragStart(e, 'OUTPUT RESULT')}
            className='p-2 bg-gray-200 border border-gray-300 rounded-md cursor-pointer mb-2'
          >
            OUTPUT RESULT
          </div>
        </div>
      </div>
    </div>
  )
}

export default Lesson4
