import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useEffect, useState } from 'react' // Import useEffect for checking authentication
import {
  Practice,
  Shop,
  Learn,
  Home,
  Signin,
  Signup,
} from './dashboard/pages/index'
import {
  Unit1,
  Unit2,
  Unit3,
  Unit4,
  Unit0,
} from './dashboard/lessons/fundamentals/index'

import Layout from './dashboard/layout/Layout'
import PrivateRoute from './dashboard/pages/PrivateRoute' // Import the PrivateRoute component

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
 

  // Check if the user is authenticated by checking localStorage
  useEffect(() => {
    const user = localStorage.getItem('users')
    if (user) {
      setIsAuthenticated(true)
    } else {
      setIsAuthenticated(false)
    }
  }, []) // This will run only when the component mounts

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path='/home' element={<Home />} />
        <Route path='/sign-up' element={<Signup />} />
        <Route path='/sign-in' element={<Signin />} />

        {/* Protected Routes */}
        <Route
          path='/'
          element={
            <PrivateRoute isAuthenticated={isAuthenticated}>
              <Layout />
            </PrivateRoute>
          }
        >
          <Route index element={<Learn />} />
          <Route path='practice' element={<Practice />} />
          <Route path='shop' element={<Shop />} />
        </Route>
        <Route
          path='/fundamentals/introduction'
          element={
            <PrivateRoute isAuthenticated={isAuthenticated}>
              <Unit0 />
            </PrivateRoute>
          }
        />
        <Route
          path='/fundamentals/variables'
          element={
            <PrivateRoute isAuthenticated={isAuthenticated}>
              <Unit1 />
            </PrivateRoute>
          }
        />
        <Route
          path='/fundamentals/arithematics'
          element={
            <PrivateRoute isAuthenticated={isAuthenticated}>
              <Unit2 />
            </PrivateRoute>
          }
        />
        <Route
          path='/fundamentals/conditionals'
          element={
            <PrivateRoute isAuthenticated={isAuthenticated}>
              <Unit3 />
            </PrivateRoute>
          }
        />
        <Route
          path='/fundamentals/loops'
          element={
            <PrivateRoute isAuthenticated={isAuthenticated}>
              <Unit4 />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  )
}

export default App
