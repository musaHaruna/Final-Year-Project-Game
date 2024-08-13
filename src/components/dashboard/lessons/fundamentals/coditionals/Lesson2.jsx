import React, { useState } from 'react'
import Lottie from 'react-lottie'
import rainAnimation from '../../../../../assets/animations/fundamentals/rain.json'
import clearSkyAnimation from '../../../../../assets/animations/fundamentals/clear-sky.json'

const Lesson2 = () => {
  const [temperature, setTemperature] = useState(30) // Initial temperature

  const renderWeatherAnimation = () => {
    if (temperature > 50) {
      return (
        <div className='flex justify-center items-center flex-col'>
          <h2 className='text-2xl font-bold mb-4'>
            It's raining because the temperature is over 50 degrees!
          </h2>
          <Lottie
            options={{
              loop: true,
              autoplay: true,
              animationData: rainAnimation,
            }}
            height={400}
            width={400}
          />
        </div>
      )
    } else {
      return (
        <div className='flex justify-center items-center flex-col'>
          <h2 className='text-2xl font-bold mb-4'>
            The sky is clear because the temperature is 50 degrees or less.
          </h2>
          <Lottie
            options={{
              loop: true,
              autoplay: true,
              animationData: clearSkyAnimation,
            }}
            height={400}
            width={400}
          />
        </div>
      )
    }
  }

  const handleInputChange = (e) => {
    setTemperature(Number(e.target.value)) // Update temperature with the new input value
  }

  return (
    <div>
      <h1 className='text-3xl font-bold mb-6 text-center'>
        Understanding Conditionals: Temperature and Weather
      </h1>
      <p className='text-lg mb-4 text-center'>
        Enter a temperature and see what happens!
      </p>
      <div className='flex justify-center mb-6'>
        <input
          type='number'
          value={temperature}
          onChange={handleInputChange}
          className='w-20 text-center border-2 border-gray-300 rounded-md'
        />
        <span className='ml-2 text-2xl'>°C</span>
      </div>
      <p className='text-2xl text-center mb-6'>
        Current Temperature: {temperature}°C
      </p>
      <div className='flex justify-center items-center'>
        {renderWeatherAnimation()}
      </div>
    </div>
  )
}

export default Lesson2
