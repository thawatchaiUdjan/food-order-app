import React, { useContext, useEffect, useState } from 'react'
import { TrashIcon } from '@heroicons/react/24/outline'
import FoodCartContext from '../contexts/FoodCartContext'
import ConfirmModalContext from '../contexts/ConfirmModalContext'

export default function FoodCartCard({ foodCartIndex, foodCart }) {
    const { addFoodCartAmount, removeFoodCart } = useContext(FoodCartContext)
    const { open } = useContext(ConfirmModalContext)

    function onClickRemoveButton() {
        open({
            title: 'Confirm Remove',
            detail: 'Are you sure you want to remove this food?',
            onConfirm: () => {
                removeFoodCart(foodCartIndex)
            }
        })
    }

    return (
        <div className='flex flex-row items-center h-24 border border-gray-200 rounded-xl shadow-md'>
            <img src={foodCart.food.food_image_url} className='flex-none object-cover w-32 h-full rounded-l-xl shadow-md' />
            <div className='min-w-56 grow flex flex-col ml-6 h-full justify-center'>
                <div className='text-xl text-primary text-opacity-80'>{foodCart.food.food_name}</div>
                <div className='text-sm text-gray-400'>
                    <span className='text-gray-500 mr-2'>${foodCart.food.food_price}</span>
                    <span>each</span>
                </div>
            </div>
            <div className='min-w-52 flex flex-col items-center gap-3'>
                <div className='px-10 flex flex-row items-center gap-5'>
                    <button className='btn btn-circle btn-sm btn-secondary shadow-md text-gray-500' disabled={foodCart.amount <= 1}
                        onClick={() => addFoodCartAmount(foodCartIndex, foodCart.amount - 1)}>
                        -
                    </button>
                    <div className='text-gray-500'>{foodCart.amount}</div>
                    <button className='btn btn-circle btn-sm btn-secondary shadow-md text-gray-500'
                        onClick={() => addFoodCartAmount(foodCartIndex, foodCart.amount + 1)}>
                        +
                    </button>
                </div>
                <div className='text-md text-gray-500 mr-2'>${foodCart.total}</div>
            </div>
            <button className='flex-none btn btn-error rounded-r-xl rounded-l-none h-full shadow-md'
                onClick={onClickRemoveButton}>
                <TrashIcon className='size-6'></TrashIcon>
            </button>
        </div>
    )
}