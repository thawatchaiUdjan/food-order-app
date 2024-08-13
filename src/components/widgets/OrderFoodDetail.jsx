import React from 'react'

export default function OrderFoodDetail({ food }) {
    return (
        <div className='flex flex-row items-end mt-2 gap-3'>
            <div className='w-1/4'>
                <div className='text-lg overflow-hidden text-ellipsis whitespace-nowrap'>{food.food_name}</div>
                <div className='text-sm text-gray-400 overflow-hidden text-ellipsis whitespace-nowrap'>{food.food_description}</div>
            </div>
            <div className='text-black text-opacity-50 text-sm'>
                <span className='mr-3'>x{food.food_amount}</span>
                <span>${food.food_total_price}</span>
            </div>
        </div>
    )
}
