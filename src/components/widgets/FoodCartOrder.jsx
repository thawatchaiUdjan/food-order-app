import React, { useContext, useEffect, useState } from 'react'
import { ArrowRightIcon } from '@heroicons/react/24/solid'
import FoodCartContext from '../contexts/FoodCartContext'
import FoodCartList from '../widgets/FoodCartList'
import ConfirmModalContext from '../contexts/ConfirmModalContext'
import OrderContext from '../contexts/OrderContext'
import ButtonIcon from './ButtonIcon'
import { useNavigate } from 'react-router-dom'

export default function FoodCartOrder() {
    const { foodCarts, clearFoodCart } = useContext(FoodCartContext)
    const { open } = useContext(ConfirmModalContext)
    const { createOrder } = useContext(OrderContext)
    const [isLoading, setIsLoading] = useState(false)
    const [subtotalCost, setSubtotal] = useState(0)
    const [deliveryCost, setDeliveryCost] = useState(0)
    const [totalCost, setTotalCost] = useState(0)
    const navigate = useNavigate()

    function onClickOrderButton() {
        open({
            title: 'Confirm Order',
            detail: 'Are you sure you want to order theses foods?',
            onConfirm: async () => {
                setIsLoading(true)
                await orderFood()
                clearFoodCart()
                setIsLoading(false)
                navigate('/')
            },
        })
    }

    async function orderFood() {
        await createOrder({
            order: {
                subtotal_price: subtotalCost,
                delivery_price: deliveryCost,
                total_price: totalCost,
            },
            foods: foodCarts
        })
    }

    function calculateSubtotal() {
        const subtotal = foodCarts.reduce((total, foodCart) => total + parseFloat(foodCart.total), 0).toFixed(2)
        const total = parseFloat(subtotal + deliveryCost).toFixed(2)
        setSubtotal(subtotal)
        setTotalCost(total)
    }

    useEffect(() => {
        calculateSubtotal()
    }, [foodCarts])

    return (
        <div className="flex justify-center mx-auto w-2/3 mt-10 mb-20 pt-20">
            <div className="flex flex-col w-full">
                <div className="text-center text-3xl text-primary uppercase">
                    Your Food
                </div>
                <hr className="border-t border-gray-300 w-full my-6 mx-auto" />
                <FoodCartList />
                <hr className="border-t border-gray-300 w-full my-6 mx-auto" />
                <FoodCartSummarize
                    subtotalCost={subtotalCost}
                    deliveryCost={deliveryCost}
                    totalCost={totalCost} >
                </FoodCartSummarize>
                <ButtonIcon
                    text={'Order'}
                    icon={<ArrowRightIcon className='size-5' />}
                    isLoading={isLoading}
                    onClick={onClickOrderButton}
                />
            </div>
        </div>
    )
}

function FoodCartSummarize({ subtotalCost, deliveryCost, totalCost }) {
    return (
        <>
            <div className='flex justify-between text-lg'>
                <div className='text-gray-500 text-opacity-70'>Subtotal</div>
                <div className='text-primary text-opacity-70'>${subtotalCost}</div>
            </div>
            <div className='flex justify-between text-lg'>
                <div className='text-gray-500 text-opacity-70'>Delivery</div>
                <div className='text-primary text-opacity-70'>${deliveryCost}</div>
            </div>
            <div className='flex justify-between text-lg my-5'>
                <div className='font-semibold'>Total</div>
                <div className='font-semibold text-primary'>${totalCost}</div>
            </div>
        </>
    )
}
