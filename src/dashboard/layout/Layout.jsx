import React from 'react'
import { Outlet } from 'react-router-dom'
import { Navbar, Sidebar, XPs } from './index'

const Layout = () => {
  return (
    <div className='layout'>
      <Navbar />
      <div className='content container'>
        <Sidebar />
        <div className='main-content'>
          <Outlet />
        </div>
        <XPs />
      </div>
    </div>
  )
}

export default Layout
