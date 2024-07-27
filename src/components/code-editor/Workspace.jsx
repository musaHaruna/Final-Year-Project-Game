import React from 'react'

const Workspace = ({ workspace, handleDrop, handleChange }) => (
  <div
    className='w-1/2 p-4 border border-gray-300 rounded-md overflow-y-scroll h-52'
    onDrop={handleDrop}
    onDragOver={(e) => e.preventDefault()}
  >
    <h2 className='text-md font-medium'>Workspace</h2>
    {workspace.map((item, index) => (
      <div key={index} className='p-2 mb-2 flex items-center gap-1'>
        <div className='flex items-center'>
          <span className='mr-2'>{item.type}</span>
        </div>
        {item.type.includes('=') && !item.type.includes('[A] + [B]') && (
          <input
            type='text'
            value={item.value}
            onChange={(e) => handleChange(index, e.target.value)}
            className='p-2 border border-gray-300 rounded-md'
            placeholder={`${item.type.split(' ')[0]}`}
          />
        )}
        {item.type === 'number C = [A] + [B]' && (
          <span className='ml-2'>{item.value}</span>
        )}
      </div>
    ))}
  </div>
)

export default Workspace
