import React from 'react'

const Output = ({ output }) => (
  <div className='w-1/2 p-4 border border-gray-300 rounded-md'>
    <h2 className='text-lg font-medium mb-2'>Output</h2>
    <div className='p-2 bg-gray-100 border border-gray-300 rounded-md h-16 flex items-center justify-center'>
      {output !== null ? output : 'Output will be displayed here'}
    </div>
  </div>
)

export default Output
