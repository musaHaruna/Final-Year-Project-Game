import React from 'react'

const XPs = () => {
  return (
    <div className='bg-white p-4 rounded-lg shadow-md w-64 h-36'>
      <div className='text-gray-800 font-semibold text-lg mb-2'>
        Unlock Leaderboards!
      </div>
      <div className='flex items-center'>
        <div className='w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center'>
          <svg
            className='w-6 h-6 text-gray-400'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              d='M12 11c1.656 0 3-1.344 3-3S13.656 5 12 5 9 6.344 9 8s1.344 3 3 3zm0 1c-2.4 0-7 1.2-7 3.6V17h14v-1.4c0-2.4-4.6-3.6-7-3.6z'
            />
          </svg>
        </div>
        <div className='ml-4'>
          <div className='text-gray-600 text-sm'>
            Complete 9 more lessons to start competing
          </div>
        </div>
      </div>
    </div>
  )
}

export default XPs
