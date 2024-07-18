import { Icon } from '@iconify/react'
const NavigationButton = ({
  text,
  bgColor = 'bg-green-500',
  textColor = 'text-white',
  shadowColor = 'shadow-green-500/50',
  icon,
  onClick,
}) => {
  return (
    <button
      className={`flex items-center justify-center py-2 pr-11 pl-11 rounded-xl ${bgColor} ${textColor} shadow-lg ${shadowColor} font-semibold hover:shadow-xl transition-shadow duration-300`}
      onClick={onClick}
    >
      {icon && <Icon width={26} icon={icon} className='mr-2' />}
      {text}
    </button>
  )
}

export default NavigationButton
