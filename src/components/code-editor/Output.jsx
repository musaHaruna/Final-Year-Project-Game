import React from 'react'
import { DotLottieReact } from '@lottiefiles/dotlottie-react'

const Output = ({ output, outputAnimation, dotLottieRef }) => (
  <div className='w-1/2 p-4 border border-gray-300 rounded-md h-52 overflow-y-scroll'>
    <h2 className='text-md font-medium mb-2 '>Output</h2>
    {output !== null ? output : 'Output will be displayed here'}
    <DotLottieReact
      src={outputAnimation}
      loop
      autoplay={false} // Controlled manually
      dotLottieRefCallback={(ref) => (dotLottieRef.current = ref)}
      onClick={outputAnimation} // Play animation on click
    />
  </div>
)

export default Output
