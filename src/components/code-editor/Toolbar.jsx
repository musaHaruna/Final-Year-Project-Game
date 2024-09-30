import React from 'react'

const Toolbar = ({ elements, handleDragStart }) => (
  <div className='flex gap-6 items-start'>
    {/* Variables Section */}
    <div>
      {elements.some((element) => element.variable) && (
        <div>
          <h3 className='text-md font-medium mb-2'>Variables</h3>
          {elements
            .filter((element) => element.variable)
            .map((element, index) => (
              <div
                key={index}
                draggable
                onDragStart={(e) => handleDragStart(e, element.variable)}
                className='rounded-md cursor-pointer mb-2 button-generic'
              >
                {element.variable}
              </div>
            ))}
        </div>
      )}
    </div>

    {/* Operations Section */}
    <div>
      {elements.some((element) => element.operation) && (
        <div>
          <h3 className='text-md font-medium mb-2'>Operations</h3>
          {elements
            .filter((element) => element.operation)
            .map((element, index) => (
              <div
                key={index}
                draggable
                onDragStart={(e) => handleDragStart(e, element.operation)}
                className='button-generic rounded-md cursor-pointer mb-2'
              >
                {element.operation}
              </div>
            ))}
        </div>
      )}
    </div>

    {/* Outputs Section */}
    <div>
      {elements.some((element) => element.output) && (
        <div>
          <h3 className='text-md font-medium mb-2'>Outputs</h3>
          {elements
            .filter((element) => element.output)
            .map((element, index) => (
              <div
                key={index}
                draggable
                onDragStart={(e) => handleDragStart(e, element.output)}
                className='button-generic rounded-md cursor-pointer mb-2'
              >
                {element.output}
              </div>
            ))}
        </div>
      )}
    </div>

    {/* Conditionals Section */}
    <div>
      {elements.some((element) => element.conditional) && (
        <div>
          <h3 className='text-md font-medium mb-2'>Conditionals</h3>
          {elements
            .filter((element) => element.conditional)
            .map((element, index) => (
              <div
                key={index}
                draggable
                onDragStart={(e) => handleDragStart(e, element.conditional)}
                className='button-generic rounded-md cursor-pointer mb-2'
              >
                {element.conditional}
              </div>
            ))}
        </div>
      )}
    </div>

    {/* Actions Section */}
    <div>
      {elements.some((element) => element.action) && (
        <div>
          <h3 className='text-md font-medium mb-2'>Actions</h3>
          {elements
            .filter((element) => element.action)
            .map((element, index) => (
              <div
                key={index}
                draggable
                onDragStart={(e) => handleDragStart(e, element.action)}
                className='button-generic rounded-md cursor-pointer mb-2'
              >
                {element.action}
              </div>
            ))}
        </div>
      )}
    </div>
  </div>
)

export default Toolbar
