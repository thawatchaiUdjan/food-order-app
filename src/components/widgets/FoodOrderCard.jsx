import React, { useContext, useEffect, useState } from 'react'
import OrderContext from '../contexts/OrderContext'
import { CheckIcon, BellAlertIcon, BeakerIcon, TruckIcon, ClockIcon } from '@heroicons/react/24/outline'
import ButtonIconOutline from './ButtonIconOutline'
import ConfirmModalContext from '../contexts/ConfirmModalContext'
import OrderFoodDetail from './OrderFoodDetail'
import { MapPinIcon } from '@heroicons/react/24/solid'

export default function FoodOrderCard() {
    const statuses = [
        {
            text: 'Prepare',
            icon: <BellAlertIcon className="size-0 hidden md:size-6 md:inline mt-3 text-success animate-bounce" />,
        },
        {
            text: 'Cooking',
            icon: <BeakerIcon className="size-0 hidden md:size-6 md:inline mt-3 text-success animate-bounce" />,
        },
        {
            text: 'Delivery',
            icon: <TruckIcon className="size-0 hidden md:size-6 md:inline mt-3 text-success animate-bounce" />,
        },
        {
            text: 'Ready',
            icon: <ClockIcon className="size-0 hidden md:size-6 md:inline mt-3 text-success animate-bounce" />,
        },
    ]

    const { foodOrder, getOrder, cancelOrder } = useContext(OrderContext)
    const { open } = useContext(ConfirmModalContext)
    const [isLoading, setIsLoading] = useState(false)

    function onClickCancelButton() {
        open({
            title: 'Confirm cancel order',
            detail: 'Are you sure you want to cancel this order?',
            onConfirm: async () => {
                setIsLoading(true)
                await cancelOrder()
                setIsLoading(false)
            }
        })
    }

    return (
        foodOrder &&
        <div className='md:w-3/4 mt-28 mx-auto px-7 md:px-0'>
            <div className="collapse collapse-arrow bg-white shadow-lg border text-primary">
                <input type="checkbox" />
                <div className="collapse-title mx-auto">
                    <ul className="steps steps-vertical md:steps-horizontal w-full text-gray-600 font-semibold">
                        {
                            statuses.map((status, index) => (
                                <FoodStatusItem
                                    key={index}
                                    index={index}
                                    status={foodOrder.order.order_status.status_value}
                                    text={status.text}
                                    icon={status.icon}>
                                </FoodStatusItem>
                            ))
                        }
                    </ul>
                </div>
                <div className="collapse-content px-7 pt-0 md:pt-3 mb-4">
                    <div className='flex flex-col md:flex-row items-baseline text-lg font-bold gap-1 md:gap-3'>
                        <div className='flex-1'>Your Food</div>
                        <div className='font-normal text-sm text-black text-opacity-50'>Subtotal: ${foodOrder.order.subtotal_price}</div>
                        <div className='font-normal text-sm text-black text-opacity-50'>{foodOrder.order.order_delivery_option.delivery_name}: ${foodOrder.order.order_delivery_option.delivery_cost}</div>
                        <div className='text-xl'>Total: ${foodOrder.order.total_price}</div>
                    </div>
                    <hr className='my-2'></hr>
                    {
                        foodOrder.foods.map((food, index) => (<OrderFoodDetail key={index} food={food} />))
                    }
                    <hr className='my-3'></hr>
                    <div className='flex flex-row items-center gap-2'>
                        <MapPinIcon className='size-6 flex-shrink-0 text-error' />
                        <div className='text-sm text-gray-700'>{foodOrder.order.order_address}</div>
                    </div>
                    <hr className='mt-4 mb-5'></hr>
                    <ButtonIconOutline text={'Cancel'} buttonType={'error'} isLoading={isLoading} onClick={onClickCancelButton} />
                </div>
            </div>
        </div>
    )
}

function FoodStatusItem({ index, status, icon, text }) {
    const isCurrent = index == status
    const isSuccess = index <= status
    let statusIcon = ''
    if (isCurrent) {
        statusIcon = icon
    } else if (isSuccess) {
        statusIcon = <CheckIcon className="size-0 hidden sm:size-6 sm:inline mt-3 text-success" />
    }

    return (
        <li className={`step ${isSuccess ? 'step-success' : ''}`}>
            {statusIcon}
            <p className='mt-1'>{text}</p>
        </li>
    )
}
