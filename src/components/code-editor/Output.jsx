import React from 'react'
import Lottie from 'react-lottie'

const Output = ({ output, missionAnimation }) => (
  <div className='w-1/2 p-4 border border-gray-300 rounded-md h-52 overflow-y-scroll'>
    <h2 className='text-md font-medium mb-2 '>Output</h2>
    {output !== null ? output : 'Output will be displayed here'}
    <div>
      <Lottie options={missionAnimation} height={100} width={100} />
    </div>
  </div>
)

export default Output
