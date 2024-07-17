import { NavLink } from 'react-router-dom'
import Home from '../../assets/home.png'
import Dumbbell from '../../assets/dumbbell.png'
import Shop from '../../assets/shop.png'

const Sidebar = () => {
  return (
    <nav>
      <ul className='space-y-4 position-sidebar'>
        <li>
          <NavLink
            to='/'
            exact
            className={({ isActive }) =>
              isActive
                ? 'flex items-center space-x-2 text-blue-500 bg-blue-100 rounded-lg p-2'
                : 'flex items-center space-x-2 text-gray-700 hover:bg-gray-100 rounded-lg p-2'
            }
          >
            <img src={Home} alt='Learn Icon' className='w-6 h-6' />
            <span className='uppercase'>Learn</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            to='/practice'
            className={({ isActive }) =>
              isActive
                ? 'flex items-center space-x-2 text-blue-500 bg-blue-100 rounded-lg p-2'
                : 'flex items-center space-x-2 text-gray-700 hover:bg-gray-100 rounded-lg p-2'
            }
          >
            <img src={Dumbbell} alt='Practice Icon' className='w-6 h-6' />
            <span className='uppercase'>Practice</span>
          </NavLink>
        </li>

        <li>
          <NavLink
            to='/shop'
            className={({ isActive }) =>
              isActive
                ? 'flex items-center space-x-2 text-blue-500 bg-blue-100 rounded-lg p-2'
                : 'flex items-center space-x-2 text-gray-700 hover:bg-gray-100 rounded-lg p-2'
            }
          >
            <img src={Shop} alt='Shop Icon' className='w-6 h-6' />
            <span className='uppercase'>Shop</span>
          </NavLink>
        </li>
      </ul>
    </nav>
  )
}

export default Sidebar
