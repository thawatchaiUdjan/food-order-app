import React from 'react'

export default function OrderFoodDetail({ food }) {
    return (
        <div className='flex flex-wrap items-center mt-2'>
            <div className='flex-1 mr-6'>
                <div className='text-lg overflow-hidden text-ellipsis whitespace-nowrap'>
                    {food.food_name}
                </div>
                {
                    food.food_option_string.map((option, index) => (
                        <span key={index} className='text-sm text-gray-500 mr-1'>
                            {index == food.food_option_string.length - 1 ? option : `${option},`}
                        </span>
                    ))
                }
                <div className='text-xs text-gray-400'>
                    {food.food_option_note}
                </div>
            </div>
            <div className='text-black text-opacity-50 text-sm mt-2 sm:mt-0'>
                <span className='mr-3'>x{food.food_amount}</span>
                <span>${food.food_total_price}</span>
            </div>
        </div>
    )
}
