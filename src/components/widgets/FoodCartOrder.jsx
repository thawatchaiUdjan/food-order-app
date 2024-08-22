import React, { useContext, useEffect, useState } from 'react'
import { ArrowRightIcon, ChevronDownIcon } from '@heroicons/react/24/solid'
import FoodCartContext from '../contexts/FoodCartContext'
import FoodCartList from '../widgets/FoodCartList'
import ConfirmModalContext from '../contexts/ConfirmModalContext'
import OrderContext from '../contexts/OrderContext'
import ButtonIcon from './ButtonIcon'
import { useNavigate } from 'react-router-dom'
import DeliveryOptionCard from './DeliveryOptionCard'
import { MapPinIcon } from '@heroicons/react/24/solid'
import MapLocationModalContext, { MapLocationModalProvider } from '../contexts/MapLocationContext'

export default function FoodCartOrder() {
    const { foodCarts, delivery, location, clearFoodCart } = useContext(FoodCartContext)
    const { open } = useContext(ConfirmModalContext)
    const { createOrder } = useContext(OrderContext)
    const [isLoading, setIsLoading] = useState(false)
    const [subtotalCost, setSubtotal] = useState(0)
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
                total_price: totalCost,
                order_address: location.address,
                order_delivery_option: delivery._id,
            },
            foods: foodCarts
        })
    }

    function calculateSubtotal() {
        const subtotal = foodCarts.reduce((total, foodCart) => total + parseFloat(foodCart.total), 0).toFixed(2)
        const total = parseFloat(parseFloat(subtotal) + delivery.delivery_cost).toFixed(2)
        setSubtotal(subtotal)
        setTotalCost(total)
    }

    useEffect(() => {
        calculateSubtotal()
    }, [foodCarts, delivery])

    return (
        <div className="flex justify-center mx-auto px-8 md:px-0 md:w-2/3 mt-10 mb-20 pt-20">
            <div className="flex flex-col w-full">
                <div className="text-center text-3xl text-primary uppercase mb-3">Your Cart</div>

                {/* delivery location */}
                <HeaderText text={'Address'} />
                <MapLocationModalProvider>
                    <DeliveryAddress />
                </MapLocationModalProvider>

                {/* delivery options */}
                <LineDivider />
                <HeaderText text={'Delivery'} />
                <DeliveryOptionList />
                
                {/* foods cart */}
                <LineDivider />
                <HeaderText text={'Food'} />
                <FoodCartList />

                {/* summary order */}
                <LineDivider />
                <FoodCartSummarize
                    subtotalCost={subtotalCost}
                    deliveryCost={delivery.delivery_cost}
                    totalCost={totalCost} >
                </FoodCartSummarize>

                {/* button group */}
                <ButtonIcon
                    text={'Order'}
                    icon={<ArrowRightIcon className='size-5' />}
                    isLoading={isLoading}
                    disabled={!(foodCarts && delivery && location)}
                    onClick={onClickOrderButton}
                />
            </div>
        </div>
    )
}

function DeliveryAddress() {
    const { openMapLocation } = useContext(MapLocationModalContext)
    const { location, setLocation } = useContext(FoodCartContext)

    function onSelectLocation(location) {
        setLocation(location)
    }

    return (
        <div
            className='w-full h-auto p-3 btn btn-outline btn-primary font-normal flex flex-row items-center justify-start'
            onClick={() => openMapLocation(onSelectLocation)}>
            <MapPinIcon className='size-6 text-error' />
            <div className='text-sm flex-1 xl:flex-none'>{location ? location.address : 'Choose your location'}</div>
            <div className='xl:flex-1'><ChevronDownIcon className='size-6 ml-auto' /></div>
        </div>
    )
}

function DeliveryOptionList() {
    const { deliveryOptions, getDeliveryOptions, clearDeliveryOption } = useContext(FoodCartContext)

    useEffect(() => {
        clearDeliveryOption()
        getDeliveryOptions()
    }, [])

    return (
        <div className="flex flex-col gap-4">
            {
                deliveryOptions.map((option, index) => (
                    <DeliveryOptionCard key={index} option={option} />
                ))
            }
        </div>
    )
}

function FoodCartSummarize({ subtotalCost, deliveryCost, totalCost }) {
    return (
        <div className='mt-3'>
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
        </div>
    )
}

function HeaderText({ text }) {
    return (<div className='text-2xl text-primary my-2'>{text}</div>)
}

function LineDivider() {
    return (<hr className="border-t border-gray-300 w-full my-6 mb-2 mx-auto" />)
}