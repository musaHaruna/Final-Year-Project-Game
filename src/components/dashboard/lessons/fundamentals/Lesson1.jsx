import React, { useState } from 'react'
import { DotLottieReact } from '@lottiefiles/dotlottie-react'
import trail from '../../../../assets/animations/fundamentals/character.lottie'

const Lesson1 = () => {
  const [dotLottie, setDotLottie] = useState(null)
  const [action, setAction] = useState(0) // 0: play, 1: pause, 2: stop

  const dotLottieRefCallback = (dotLottie) => {
    setDotLottie(dotLottie)
  }

  const handleClick = () => {
    if (dotLottie) {
      switch (action) {
        case 0:
          dotLottie.play()
          setAction(1)
          break
        case 1:
          dotLottie.pause()
          setAction(2)
          break
        default:
          break
      }
    }
  }

  return (
    <div>
      <h3 className='text-2xl mt-10 text-center font-bold text-gray-500'>
        Write simple instructions in plain English to understand the concept of
        programming and then convert these instructions into pseudo code
      </h3>
      <p className='text-xl mt-6'>
        <span className='font-bold'>Objectives:</span> Write a program that
        guides a robot in the warehouse to pick up and move items efficiently
      </p>
      <div
        className='flex justify-center items-center mt-8'
        onClick={handleClick}
      >
        <div
          style={{
            width: '400px',
          }}
        >
          <DotLottieReact
            src={trail}
            loop
            autoplay
            dotLottieRefCallback={dotLottieRefCallback}
          />
        </div>
      </div>

      <h3 className='text-2xl  text-end font-bold text-gray-500'>
        Click on the next button to continue
      </h3>
    </div>
  )
}

export default Lesson1
