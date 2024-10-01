import { Navigate } from 'react-router-dom'

const PrivateRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem('users') // Check if there's a user in localStorage

  return isAuthenticated ? children : <Navigate to='/home' />
}

export default PrivateRoute
