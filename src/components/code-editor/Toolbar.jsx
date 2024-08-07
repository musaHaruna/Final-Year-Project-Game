import React from 'react'

const Toolbar = ({ elements, handleDragStart }) => (
  <div className='flex gap-6 items-start'>
    <div>
      {elements.some((element) => element.variable) && (
        <div className=''>
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
    <div>
      {elements.some((element) => element.output) && (
        <div className=''>
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
    <div>
      {elements.some((element) => element.operation) && (
        <div className=''>
          <h3 className='text-md font-medium mb-2'>Operation</h3>
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
  </div>
)

export default Toolbar
