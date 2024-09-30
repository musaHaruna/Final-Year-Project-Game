import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Signup = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [showPassword, setShowPassword] = useState(false) // Toggle password visibility
  const [isLoading, setIsLoading] = useState(false) // Loading state

  // Regex to validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

  const handleSignup = (e) => {
    e.preventDefault()

    // Validation: Check if email and password are provided
    if (!email || !password) {
      setErrorMessage('Please enter both email and password.')
      return
    }

    // Validate email format
    if (!emailRegex.test(email)) {
      setErrorMessage('Please enter a valid email address.')
      return
    }

    // Validate password length
    if (password.length < 8) {
      setErrorMessage('Password must be at least 8 characters long.')
      return
    }

    // Check if user already exists in localStorage
    const existingUsers = JSON.parse(localStorage.getItem('users')) || []
    const userExists = existingUsers.find((user) => user.email === email)

    if (userExists) {
      setErrorMessage(
        'User already exists. Please use a different email or sign in.'
      )
      return
    }

    // Simulate loading process
    setIsLoading(true) // Start loading

    setTimeout(() => {
      // Store the new user in localStorage
      const newUser = { email, password }
      localStorage.setItem('users', JSON.stringify([...existingUsers, newUser]))

      // Clear form fields
      setEmail('')
      setPassword('')
      setErrorMessage('')

      // Show modal and stop loading
      setIsLoading(false)
      setIsModalOpen(true)
    }, 2000) // Simulate a 2-second delay for the loading process
  }

  return (
    <div className='bg-gray-100 min-h-screen' style={{ padding: '2rem' }}>
      <div style={{ display: 'flex', justifyContent: 'end' }}>
        <button
          style={{ display: 'flex', justifyContent: 'end' }}
          type='submit'
          className='button-generic bg-blue-500 text-white py-3 rounded-lg font-bold hover:bg-blue-600'
          onClick={() => navigate('/sign-in')}
        >
          Login
        </button>
      </div>

      <div className='flex items-center justify-center'>
        <div className='p-8 rounded-lg w-full max-w-md'>
          <h2 className='text-2xl font-bold text-center mb-6'>
            Create your profile
          </h2>

          {errorMessage && (
            <p className='text-red-500 text-center mb-4'>{errorMessage}</p>
          )}

          <form className='space-y-4' onSubmit={handleSignup}>
            <input
              style={{
                backgroundColor: '#E5E5E5',
                border: '2px solid #E5E5E5',
              }}
              type='email'
              placeholder='Email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className='w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400'
            />

            <div className='relative'>
              <input
                style={{
                  backgroundColor: '#E5E5E5',
                  border: '2px solid #E5E5E5',
                }}
                type={showPassword ? 'text' : 'password'} // Toggle between 'text' and 'password'
                placeholder='Password (at least 8 characters)'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className='w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400'
              />
              <button
                type='button'
                className='absolute right-3 top-1/2 transform -translate-y-1/2 text-sm text-gray-600'
                onClick={() => setShowPassword(!showPassword)} // Toggle password visibility
              >
                {showPassword ? '🙈' : '👁️'}
              </button>
            </div>

            <button
              type='submit'
              className='button-generic w-full bg-blue-500 text-white py-3 rounded-lg font-bold hover:bg-blue-600'
            >
              {isLoading ? 'Loading...' : 'Create Account'}{' '}
              {/* Show loading text */}
            </button>
          </form>
        </div>
      </div>

      {isModalOpen && (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center'>
          <div className='bg-white p-6 rounded-lg'>
            <h3 className='text-xl font-bold mb-4'>
              Account Created Successfully!
            </h3>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <button
                className='bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600'
                onClick={() => navigate('/sign-in')}
              >
                Go to Sign-In
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Signup
