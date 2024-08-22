import React, { useContext } from 'react'
import FoodCartContext from '../contexts/FoodCartContext';

export default function DeliveryOptionCard({ option }) {
    const { delivery, setDelivery } = useContext(FoodCartContext)

    function onClickDeliveryOption(option) {
        setDelivery(option)
    }

    return (
        <div className={`flex flex-row items-center gap-3 border border-primary rounded-lg font-normal text-left h-auto py-2 px-4 cursor-pointer
            ${delivery === option ? 'text-secondary bg-primary' : 'text-primary hover:bg-gray-100'}`} onClick={() => onClickDeliveryOption(option)}>
            <div className='flex-1'>
                <div className="text-lg">{option.delivery_name}</div>
                <div className={`text-sm  ${delivery === option ? 'text-secondary text-opacity-80' : 'text-black text-opacity-50'} `}>{option.delivery_description}</div>
            </div>
            <div>${option.delivery_cost}</div>
        </div>
    )
}