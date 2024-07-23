import React, { useState } from 'react'

const Lesson3 = () => {
  const [workspace, setWorkspace] = useState([])
  const [output, setOutput] = useState(null)
  const [history, setHistory] = useState([])

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
    let errors = []

    // Check for required variables
    const requiredVariables = [
      { type: 'number A =', found: false, value: '' },
      { type: 'number B =', found: false, value: '' },
      { type: 'string C =', found: false, value: '' },
      { type: 'boolean D =', found: false, value: '' },
    ]

    workspace.forEach((item, index) => {
      const match = requiredVariables.find((v) => v.type === item.type)
      if (match) {
        match.found = true
        match.value = item.value.trim()

        // Validate the value
        if (item.value.trim() === '') {
          errors.push(`Please input a value for ${item.type}`)
        } else {
          const [varType] = item.type.split(' ')
          const value = item.value.trim()

          if (varType === 'number' && isNaN(value)) {
            errors.push(
              `Variable ${item.type} expects a number, but got: ${value}`
            )
          } else if (
            varType === 'boolean' &&
            !['true', 'false'].includes(value.toLowerCase())
          ) {
            errors.push(
              `Variable ${item.type} expects a boolean (true/false), but got: ${value}`
            )
          } else if (varType === 'string' && !value.match(/^["'].*["']$/)) {
            errors.push(
              `Variable ${item.type} expects a string (use quotes), but got: ${value}`
            )
          } else {
            if (varType === 'number') {
              variables[item.type.split('=')[0].trim()] = {
                type: 'number',
                value: parseFloat(value),
              }
            } else if (varType === 'boolean') {
              variables[item.type.split('=')[0].trim()] = {
                type: 'boolean',
                value: value.toLowerCase() === 'true',
              }
            } else if (varType === 'string') {
              variables[item.type.split('=')[0].trim()] = {
                type: 'string',
                value: value.slice(1, -1),
              }
            }
            alert(
              `Good job! ${item.type
                .split('=')[0]
                .trim()} has been correctly set.`
            )
          }
        }
      } else {
        errors.push(`Unexpected variable type: ${item.type}`)
      }
    })

    // Check if all required variables are present
    requiredVariables.forEach((variable) => {
      if (!variable.found) {
        errors.push(`Missing required variable: ${variable.type}`)
      }
    })

    if (errors.length > 0) {
      setOutput(`Errors: ${errors.join('; ')}`)
    } else {
      const result = Object.entries(variables)
        .map(([key, { type, value }]) => `${key} = ${value} (${type})`)
        .join(', ')
      setOutput(
        `Congratulations! You can move to the next level. Variables: ${result}`
      )
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
    <div className='container mx-auto p-4'>
      <h2 className='text-xl font-medium mb-4'>
        Drag and drop elements to declare and initialize variables.
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
              className='p-2 bg-gray-100 border border-gray-300 rounded-md mb-2 flex items-center gap-5'
            >
              <div className='flex items-center'>
                <span className='mr-2'>{item.type}</span>
              </div>
              {item.type.includes('=') && (
                <input
                  type='text'
                  value={item.value}
                  onChange={(e) => handleChange(index, e.target.value)}
                  className='p-2 border border-gray-300 rounded-md'
                  placeholder={`${item.type.split(' ')[0]}`}
                />
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
        >
          UNDO
        </button>
        <button
          onClick={handlePlay}
          className='px-4 py-2 bg-blue-500 text-white rounded-md'
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
          <li>Drag and drop variable C and input a string (use quotes).</li>
          <li>Drag and drop variable D and input a boolean (true/false).</li>
          <li>Click PLAY to see the declared variables in the output.</li>
        </ol>
      </div>

      {/* Toolbars */}
      <div className='mt-8 flex space-x-8'>
        <div className='w-1/4'>
          <h3 className='text-md font-medium mb-2'>Variables</h3>
          <div
            draggable
            onDragStart={(e) => handleDragStart(e, 'number A =')}
            className='p-2 bg-gray-200 border border-gray-300 rounded-md cursor-pointer mb-2'
          >
            number A =
          </div>
          <div
            draggable
            onDragStart={(e) => handleDragStart(e, 'string A =')}
            className='p-2 bg-gray-200 border border-gray-300 rounded-md cursor-pointer mb-2'
          >
            string A =
          </div>
          <div
            draggable
            onDragStart={(e) => handleDragStart(e, 'boolean A =')}
            className='p-2 bg-gray-200 border border-gray-300 rounded-md cursor-pointer mb-2'
          >
            boolean A =
          </div>
          <div
            draggable
            onDragStart={(e) => handleDragStart(e, 'number B =')}
            className='p-2 bg-gray-200 border border-gray-300 rounded-md cursor-pointer mb-2'
          >
            number B =
          </div>
          <div
            draggable
            onDragStart={(e) => handleDragStart(e, 'string B =')}
            className='p-2 bg-gray-200 border border-gray-300 rounded-md cursor-pointer mb-2'
          >
            string B =
          </div>
          <div
            draggable
            onDragStart={(e) => handleDragStart(e, 'boolean B =')}
            className='p-2 bg-gray-200 border border-gray-300 rounded-md cursor-pointer mb-2'
          >
            boolean B =
          </div>
          <div
            draggable
            onDragStart={(e) => handleDragStart(e, 'string C =')}
            className='p-2 bg-gray-200 border border-gray-300 rounded-md cursor-pointer mb-2'
          >
            string C =
          </div>
          <div
            draggable
            onDragStart={(e) => handleDragStart(e, 'number C =')}
            className='p-2 bg-gray-200 border border-gray-300 rounded-md cursor-pointer mb-2'
          >
            number C =
          </div>
          <div
            draggable
            onDragStart={(e) => handleDragStart(e, 'boolean C =')}
            className='p-2 bg-gray-200 border border-gray-300 rounded-md cursor-pointer mb-2'
          >
            boolean C =
          </div>
          <div
            draggable
            onDragStart={(e) => handleDragStart(e, 'boolean D =')}
            className='p-2 bg-gray-200 border border-gray-300 rounded-md cursor-pointer mb-2'
          >
            boolean D =
          </div>
          <div
            draggable
            onDragStart={(e) => handleDragStart(e, 'string D =')}
            className='p-2 bg-gray-200 border border-gray-300 rounded-md cursor-pointer mb-2'
          >
            string D =
          </div>
          <div
            draggable
            onDragStart={(e) => handleDragStart(e, 'number D =')}
            className='p-2 bg-gray-200 border border-gray-300 rounded-md cursor-pointer mb-2'
          >
            number D =
          </div>
        </div>
      </div>
    </div>
  )
}

export default Lesson3
