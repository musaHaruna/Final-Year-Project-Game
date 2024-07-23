// InnerButton.js
import React from 'react'
import { Icon } from '@iconify/react'

const InnerButton = ({
  bgColor = 'bg-green-500',
  textColor = 'text-white',
  shadowColor = 'shadow-green-500/50',
  icon,
  innerProgress,
  onClick,
}) => {
  // Determine the background color based on progress
  const buttonColor = innerProgress === 0 ? 'bg-gray-300' : bgColor

  return (
    <button
      className={`flex items-center justify-center p-6 rounded-full ${buttonColor} ${textColor} shadow-md ${shadowColor} font-semibold hover:shadow-xl transition-shadow duration-300`}
      onClick={onClick}
    >
      {icon && <Icon width={30} icon={icon} />}
    </button>
  )
}

export default InnerButton
