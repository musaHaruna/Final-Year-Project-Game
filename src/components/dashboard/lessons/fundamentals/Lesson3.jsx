import React from 'react'

const Lesson3 = ({ onCheck }) => {
  const correctAnswer = 'el coche'

  const options = [
    { imgSrc: 'path_to_image_of_car', alt: 'El coche', text: 'el coche' },
    { imgSrc: 'path_to_image_of_tree', alt: 'El árbol', text: 'el árbol' },
    { imgSrc: 'path_to_image_of_book', alt: 'El libro', text: 'el libro' },
  ]

  const handleOptionClick = (selectedOption) => {
    onCheck(selectedOption === correctAnswer)
  }

  return (
    <div>
      <div className='text-xl font-semibold mb-4'>
        Which one of these is "the car"?
      </div>
      <div className='grid grid-cols-3 gap-4 mb-4'>
        {options.map((option, index) => (
          <div
            key={index}
            className='flex flex-col items-center'
            onClick={() => handleOptionClick(option.text)}
          >
            <div className='bg-gray-200 rounded-full p-4'>
              <img src={option.imgSrc} alt={option.alt} className='h-16 w-16' />
            </div>
            <div className='mt-2'>{option.text}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Lesson3
