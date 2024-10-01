import React from 'react'
import { Link } from 'react-router-dom'
import { usePoints } from '../../context/PontsProvider'

const Navbar = () => {
  const { points } = usePoints()
  return (
    <nav className='p-2 bg-white shadow-md position'>
      <div className='container flex items-center  justify-between p-4'>
        <div className='text-2xl font-bold text-green-500'>Program</div>
        <div className='flex items-center'>
          <Link to='/' className='ml-4 text-xl text-blue-500 font-semibold'>
            Points {points}
          </Link>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
