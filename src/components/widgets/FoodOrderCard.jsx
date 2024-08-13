import React, { useContext, useEffect, useState } from 'react'
import OrderContext from '../contexts/OrderContext'
import { CheckIcon, BellAlertIcon, BeakerIcon, TruckIcon, ClockIcon } from '@heroicons/react/24/outline'
import ButtonIconOutline from './ButtonIconOutline'
import ConfirmModalContext from '../contexts/ConfirmModalContext'
import OrderFoodDetail from './OrderFoodDetail'

export default function FoodOrderCard() {
    const statuses = [
        {
            text: 'Prepare',
            icon: <BellAlertIcon className="size-6 inline mt-3 text-success animate-bounce" />,
        },
        {
            text: 'Cooking',
            icon: <BeakerIcon className="size-6 inline mt-3 text-success animate-bounce" />,
        },
        {
            text: 'Delivery',
            icon: <TruckIcon className="size-6 inline mt-3 text-success animate-bounce" />,
        },
        {
            text: 'Ready',
            icon: <ClockIcon className="size-6 inline mt-3 text-success animate-bounce" />,
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

    useEffect(() => {
        getOrder()
    }, [])

    return (
        foodOrder &&
        <>
            <div className="mx-auto w-3/4 mt-24 collapse collapse-arrow bg-white shadow-lg border text-primary">
                <input type="checkbox" />
                <div className="collapse-title text-center">
                    <ul className="steps w-full text-gray-600 font-semibold">
                        {
                            statuses.map((status, index) => (
                                <FoodStatusItem
                                    key={index}
                                    index={index}
                                    status={foodOrder.order.order_status}
                                    text={status.text}
                                    icon={status.icon}>
                                </FoodStatusItem>
                            ))
                        }
                    </ul>
                </div>
                <div className="collapse-content pl-7 pt-3">
                    <div className='flex justify-between text-lg font-bold'>
                        <div>Your Food</div>
                        <div>
                            <span className='font-normal text-sm text-black text-opacity-50 mr-3'>
                                <span className='mr-2'>subtotal: ${foodOrder.order.subtotal_price}</span>
                                <span>delivery: ${foodOrder.order.delivery_price}</span>
                            </span>
                            <span className='mr-1'>Total: </span>
                            <span className='text-xl'>${foodOrder.order.total_price}</span>
                        </div>
                    </div>
                    <hr className='my-2'></hr>
                    {
                        foodOrder.foods.map((food, index) => (<OrderFoodDetail key={index} food={food} />))
                    }
                    <hr className='my-5'></hr>
                    <ButtonIconOutline text={'Cancel'} buttonType={'error'} isLoading={isLoading} onClick={onClickCancelButton} />
                </div>
            </div>
        </>
    )
}

function FoodStatusItem({ index, status, icon, text }) {
    const isCurrent = index == status
    const isSuccess = index <= status
    let statusIcon = ''
    if (isCurrent) {
        statusIcon = icon
    } else if (isSuccess) {
        statusIcon = <CheckIcon className="size-6 inline mt-3 text-success" />
    }

    return (
        <li className={`step ${isSuccess ? 'step-success' : ''}`}>
            {statusIcon}
            <p className='mt-1'>{text}</p>
        </li>
    )
}
