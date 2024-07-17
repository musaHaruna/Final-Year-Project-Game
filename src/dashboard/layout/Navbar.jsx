import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav className='p-4 bg-white shadow-md position'>
      <div className='container flex items-center  justify-between p-4'>
        <div className='text-2xl font-bold text-green-500'>Program</div>
        <div className='flex items-center'>
          <div className='text-xl text-blue-500 font-semibold'>1</div>
          <Link to='/' className='ml-4 text-xl text-blue-500 font-semibold'>
            GO SUPER
          </Link>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
