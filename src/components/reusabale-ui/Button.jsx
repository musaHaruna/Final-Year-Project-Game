import { Icon } from '@iconify/react'

const Button = ({
  text,
  bgColor,
  textColor,
  shadowColor,
  hoverTextColor,
  clickBorderColor,
  icon,
  onClick,
}) => {
  return (
    <button
      className={`flex items-center justify-center p-3 rounded-2xl border-b-4 border-2 border-${shadowColor} ${bgColor}`}
      onClick={onClick}
    >
      {icon && <Icon width={26} icon={icon} className='mr-2' />}
      {text}
    </button>
  )
}

export default Button
