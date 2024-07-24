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
                className='p-2 bg-gray-200 border border-gray-300 rounded-md cursor-pointer mb-2'
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
                className='p-2 bg-gray-200 border border-gray-300 rounded-md cursor-pointer mb-2'
              >
                {element.output}
              </div>
            ))}
        </div>
      )}
    </div>
  </div>
)

export default Toolbar
