import React from 'react'

export default function OrderFoodDetail({ food }) {
    return (
        <div className='flex flex-row items-center mt-2'>
            <div className='w-1/4 sm:w-1/2 md:w-full'>
                <div className='text-lg overflow-hidden text-ellipsis whitespace-nowrap'>
                    {food.food_name}
                </div>
                <div className='text-sm text-gray-400 overflow-hidden text-ellipsis whitespace-nowrap'>
                    {food.food_description}
                </div>
            </div>
            <div className='text-black text-opacity-50 text-sm'>
                <span className='mx-6'>x{food.food_amount}</span>
                <span>${food.food_total_price}</span>
            </div>
        </div>
    )
}
