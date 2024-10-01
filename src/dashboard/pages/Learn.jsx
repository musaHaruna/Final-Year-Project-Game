// Learn.js
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { UnitCard, ProgressButton } from '../../components/reusabale-ui/index'
import { Icon } from '@iconify/react'
import { useProgress } from '../../context/ProgressContext'

const Learn = () => {
  const { state: progress, dispatch } = useProgress()
  const navigate = useNavigate()

  const handleButtonClick = (index) => {
    if (index > 0 && progress[index - 1] < 100) {
      alert('Complete the previous task first!')
      return
    }

    dispatch({ type: 'UPDATE_PROGRESS', index })

    const routes = [
      '/fundamentals/introduction',
      '/fundamentals/variables',
      '/fundamentals/arithematics',
      '/fundamentals/conditionals',
      '/fundamentals/loops',
      // Add more routes as needed
    ]

    if (index < routes.length) {
      navigate(routes[index])
    }
  }

  const buttons = [
    {
      text: 'START',
      buttonColor: '#84cc16',
      textColor: '#fff',
      icon: <Icon icon='solar:star-outline' />,
    },
    {
      text: 'LOCKED',
      buttonColor: '#d1d5db',
      textColor: '#6b7280',
      icon: <Icon icon='solar:lock-outline' />,
    },
    {
      text: 'CHEST',
      buttonColor: '#9ca3af',
      textColor: '#fff',
      icon: <Icon icon='solar:treasure-chest-outline' />,
    },
    {
      text: 'GUIDE',
      buttonColor: '#d1d5db',
      textColor: '#6b7280',
      icon: <Icon icon='solar:book-outline' />,
    },
    {
      text: 'GUIDE',
      buttonColor: '#d1d5db',
      textColor: '#6b7280',
      icon: <Icon icon='solar:book-outline' />,
    },
  ]

  return (
    <div>
      <UnitCard
        heading='Unit 1'
        paragraph='Form basic sentences, greet people'
        bgColor='bg-green-500'
        textColor='text-white'
        buttonProps={{
          text: 'GUIDEBOOK',
          bgColor: 'bg-green-600',
          textColor: 'text-white',
          shadowColor: 'gray-400',
          icon: 'solar:book-outline',
          onClick: () => alert('Guidebook clicked!'),
        }}
      />

      <div className='grid grid-rows-6 grid-flow-col gap-4 justify-center items-center'>
        {buttons.map((button, index) => (
          <div
            key={index}
            className={`m-2 ${
              index === 1
                ? 'ml-36'
                : index === 4
                ? 'ml-28'
                : index === 3
                ? 'mr-36 '
                : ''
            }`}
          >
            <ProgressButton
              text={progress[index] === 100 ? 'REPEAT' : button.text}
              buttonColor={button.buttonColor}
              textColor={button.textColor}
              icon={button.icon}
              progress={progress[index]}
              onClick={() => handleButtonClick(index)}
              disabled={index > 0 && progress[index - 1] < 100}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export default Learn
