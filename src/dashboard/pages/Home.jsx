import React from 'react'
import { useNavigate } from 'react-router-dom' // Import useNavigate
import heroImg from '../../assets/heroImg.png' // Ensure this is your globe image

const Home = () => {
  const navigate = useNavigate() // Initialize navigate function

  return (
    <div
      style={{ width: '100%', backgroundColor: '#235390', paddingTop: '2rem' }}
      className='h-screen'
    >
      <button
        style={{ margin: '0 2rem ', display: 'block' }}
        className='button-generic bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-8 rounded-lg'
      >
        Program
      </button>
      <div className='relative flex items-center justify-center '>
        {/* Background Stars */}
        <div className='absolute inset-0'>
          <div className='w-full h-full'>
            {/* Starry background */}
            <div className='bg-stars-pattern w-full h-full absolute inset-0'></div>
          </div>
        </div>

        {/* Content Wrapper */}
        <div
          className='flex items-center z-10'
          style={{ width: '90%', margin: '0 auto', paddingTop: '4rem' }}
        >
          {/* Globe Image */}
          <div style={{ width: '40%' }} className='mr-8'>
            <img
              src={heroImg}
              alt='Globe'
              style={{ display: 'block', width: '100%' }} // Adjust size if needed
            />
          </div>

          {/* Hero Text and Buttons */}
          <div className='text-white text-center'>
            <h1 className='text-4xl font-bold mb-8'>
              The fun and engaging way to learn programming for Beginners!
            </h1>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                flexDirection: 'column',
              }}
              className='space-y-4'
            >
              {/* Get Started Button */}
              <button
                onClick={() => navigate('/sign-up')} // Navigate to sign-up page
                className='button-generic bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-8 rounded-lg'
              >
                Get Started
              </button>

              {/* Already Have an Account Button */}
              <button
                onClick={() => navigate('/sign-in')} // Navigate to sign-in page
                className='button-generic  text-white font-bold py-3 px-8 rounded-lg'
              >
                I Already Have an Account
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
