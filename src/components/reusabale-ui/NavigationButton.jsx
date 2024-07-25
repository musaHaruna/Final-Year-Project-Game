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
      className={`flex button-generic items-center justify-center py-2 pr-11 pl-11 rounded-xl bg-white text-gray-300 font-semibold w-32`}
      onClick={onClick}
    >
      {icon && <Icon width={26} icon={icon} className='mr-2' />}
      {text}
    </button>
  )
}

export default NavigationButton
