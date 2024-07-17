import React from 'react'
import { UnitCard, Button } from '../../components/reusabale-ui/index'

const Learn = () => {
  return (
    <UnitCard
      heading='Unit 1'
      paragraph='Form basic sentences, greet people'
      bgColor='bg-green-500'
      textColor='text-white'
      buttonProps={{
        text: 'GUIDEBOOK',
        bgColor: 'bg-green-600',
        textColor: 'text-white',
        shadowColor: 'shadow-green-500/50',
        icon: 'solar:book-outline',
        onClick: () => alert('Guidebook clicked!'),
      }}
    />
  )
}

export default Learn
