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
        <div className='flex flex-col sm:flex-row items-center border border-gray-200 rounded-xl sm:max-h-28 shadow-md w-full gap-4 sm:gap-0'>
            <img src={foodCart.food.food_image_url} className='flex-none object-cover sm:w-1/4 sm:h-full rounded-tl-xl sm:rounded-l-xl rounded-tr-xl sm:rounded-tr-none shadow-md' />

            {/* food & options info */}
            <div className='grow flex flex-col sm:ml-6 h-full items-center justify-center sm:items-start overflow-auto'>
                <div className='font-semibold text-xl text-primary text-opacity-80'>{foodCart.food.food_name}</div>
                <div className=''>
                    {
                        foodCart.option.option_string.map((option, index) => (
                            <span key={index} className='text-sm text-gray-500 mr-1'>
                                {index == foodCart.option.option_string.length - 1 ? option : `${option},`}
                            </span>
                        ))
                    }
                </div>
                <div className='text-xs text-gray-400'>{foodCart.option.option_note}</div>
            </div>

            {/* amount & price adding*/}
            <div className='flex flex-col items-center'>
                <div className='px-10 flex flex-row items-center gap-4'>
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
                <div className='text-md text-gray-500 mt-2'>${foodCart.total}</div>
                <div className='text-xs text-gray-400 mt-1'>${foodCart.food.food_price} each</div>
            </div>

            {/* remove button */}
            <button className='flex-none btn btn-error rounded-tl-none rounded-bl-xl sm:rounded-l-none rounded-br-xl rounded-tr-none sm:rounded-r-xl w-full sm:w-auto h-0 sm:h-full shadow-md'
                onClick={onClickRemoveButton}>
                <TrashIcon className='size-6'></TrashIcon>
            </button>
        </div>
    )
}