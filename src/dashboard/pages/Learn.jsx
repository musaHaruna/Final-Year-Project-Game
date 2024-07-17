import { useState } from 'react'
import { UnitCard, ProgressButton } from '../../components/reusabale-ui/index'
import { Icon } from '@iconify/react'

const Learn = () => {
  const initialProgress = [10, 0, 0, 0, 0, 0]
  const [progress, setProgress] = useState(initialProgress)

  const handleButtonClick = (index) => {
    setProgress((prevProgress) =>
      prevProgress.map((p, i) => (i === index ? (p >= 100 ? 0 : p + 10) : p))
    )
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
      text: 'LOCKED',
      buttonColor: '#d1d5db',
      textColor: '#6b7280',
      icon: <Icon icon='solar:lock-outline' />,
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
          shadowColor: 'shadow-green-500/50',
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
              text={button.text}
              buttonColor={button.buttonColor}
              textColor={button.textColor}
              icon={button.icon}
              progress={progress[index]}
              onClick={() => handleButtonClick(index)}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export default Learn
