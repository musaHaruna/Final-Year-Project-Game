// src/components/Card.js
import React from 'react'
import Button from './Button'

const UnitCard = ({
  heading,
  paragraph,
  bgColor = 'bg-green-500',
  textColor = 'text-white',
  buttonProps,
}) => {
  return (
    <div
      className={`flex items-center justify-between p-4 rounded-md ${bgColor} ${textColor} shadow-lg `}
    >
      <div>
        <h2 className='text-xl font-bold'>{heading}</h2>
        <p className='text-sm'>{paragraph}</p>
      </div>
      <Button {...buttonProps} />
    </div>
  )
}

export default UnitCard
