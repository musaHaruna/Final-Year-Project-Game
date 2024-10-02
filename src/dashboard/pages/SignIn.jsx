import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Signin = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false) // Loading state

  // Email validation function using a regex pattern
  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const handleLogin = (e) => {
    e.preventDefault()

    // Validation: Check if email and password are provided
    if (!email || !password) {
      setErrorMessage('Please enter both email and password.')
      return
    }

    // Validate email format
    if (!isValidEmail(email)) {
      setErrorMessage('Please enter a valid email address.')
      return
    }

    // Validate password length (minimum 8 characters)
    if (password.length < 8) {
      setErrorMessage('Password must be at least 8 characters long.')
      return
    }

    // Check if the user exists in localStorage
    const existingUsers = JSON.parse(localStorage.getItem('users')) || []
    const user = existingUsers.find((user) => user.email === email)

    if (!user) {
      setErrorMessage(
        'No account found with this email. Please create an account.'
      )
      return
    }

    // Check if the password matches
    if (user.password !== password) {
      setErrorMessage('Incorrect password. Please try again.')
      return
    }

    // Simulate loading process
    setIsLoading(true) // Start loading

    setTimeout(() => {
      // Clear form fields
      setEmail('')
      setPassword('')
      setErrorMessage('')

      // Navigate to the dashboard or homepage after successful login
      setIsLoading(false)
      navigate('/') // Replace '/' with your desired route
    }, 2000) // Simulate a 2-second delay for the loading process
  }

  return (
    <div className='bg-gray-100 min-h-screen' style={{ padding: '2rem' }}>
      <div style={{ display: 'flex', justifyContent: 'end' }}>
        <button
          type='submit'
          className='button-generic bg-blue-500 text-white py-3 rounded-lg font-bold hover:bg-blue-600'
          onClick={() => navigate('/sign-up')}
        >
          Create an account
        </button>
      </div>
      <div className='flex items-center justify-center'>
        <div className='p-8 rounded-lg w-full max-w-md'>
          <h2 className='text-2xl font-bold text-center mb-6'>Log in</h2>

          {errorMessage && (
            <p className='text-red-500 text-center mb-4'>{errorMessage}</p>
          )}

          <form className='space-y-4' onSubmit={handleLogin}>
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

            <input
              style={{
                backgroundColor: '#E5E5E5',
                border: '2px solid #E5E5E5',
              }}
              type='password'
              placeholder='Password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className='w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400'
            />

            <button
              type='submit'
              className='button-generic w-full bg-blue-500 text-white py-3 rounded-lg font-bold hover:bg-blue-600'
            >
              {isLoading ? 'Loading...' : 'Login'} {/* Show loading text */}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Signin
