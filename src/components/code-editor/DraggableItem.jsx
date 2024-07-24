import React from 'react'

const DraggableItem = ({ type, label, handleDragStart }) => (
  <div
    draggable
    onDragStart={(e) => handleDragStart(e, type)}
    className='p-2 bg-gray-200 border border-gray-300 rounded-md cursor-pointer mb-2'
  >
    {label}
  </div>
)

export default DraggableItem
