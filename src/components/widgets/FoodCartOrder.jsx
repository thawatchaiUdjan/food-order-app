import React, { useContext, useEffect, useState } from 'react'
import { ArrowRightIcon } from '@heroicons/react/24/solid'
import FoodCartContext from '../contexts/FoodCartContext'
import FoodCartList from '../widgets/FoodCartList'
import ConfirmModalContext from '../contexts/ConfirmModalContext'
import OrderContext from '../contexts/OrderContext'
import ButtonIcon from './ButtonIcon'
import { Link, useNavigate } from 'react-router-dom'
import DeliveryOptionCard from './DeliveryOptionCard'
import { MapPinIcon } from '@heroicons/react/24/solid'
import MapLocationModalContext, { MapLocationModalProvider } from '../contexts/MapLocationContext'
import AuthContext from '../contexts/AuthContext'
import { getFormatBalance } from '../../utils'
import { MapIcon, StarIcon } from '@heroicons/react/24/outline'

export default function FoodCartOrder() {
    const { foodCarts, delivery, location, clearFoodCart } = useContext(FoodCartContext)
    const { open } = useContext(ConfirmModalContext)
    const { createOrder } = useContext(OrderContext)
    const { user } = useContext(AuthContext)
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
                    disabled={!(foodCarts && delivery && location && user.user.balance > totalCost)}
                    onClick={onClickOrderButton}
                />
                <Link to={'/profile'}><div className='text-center text-xs text-primary underline italic mt-3'>your balance: ${getFormatBalance(user.user.balance)}</div></Link>
            </div>
        </div>
    )
}

function DeliveryAddress() {
    const { openMapLocation } = useContext(MapLocationModalContext)
    const { location, setLocation } = useContext(FoodCartContext)
    const { user } = useContext(AuthContext)
    const [checked, setIsChecked] = useState(false)

    function onSelectLocation(location) {
        setLocation(location)
        setIsChecked(false)
    }

    return (
        <div className="collapse collapse-arrow border border-primary rounded-lg">
            <input type="checkbox" className='min-h-0' checked={checked} onChange={() => setIsChecked(!checked)} />
            <div className='collapse-title'>
                <div className='flex items-center gap-2'>
                    <MapPinIcon className='size-6 text-error' />
                    <div className='text-sm flex-1'>{location ? location.address : 'Choose your location'}</div>
                </div>
            </div>
            <div className="collapse-content p-0">
                <ul className='menu w-full rounded-lg py-0'>
                    {
                        user.user.location &&
                        <>
                            <hr className='mx-3 my-1' />
                            <li onClick={() => onSelectLocation(user.user.location)}>
                                <a className='flex gap-3 text-wrap'>
                                    <StarIcon className='size-5 text-primary' />
                                    <div className='flex-1'>{user.user.location.address}</div>
                                </a>
                            </li>
                        </>
                    }
                    <hr className='mx-3 my-1' />
                    <li><a className='flex justify-center' onClick={() => openMapLocation(location, onSelectLocation)}>
                        <MapIcon className='size-5 text-primary' />
                        <div>Choose from map</div>
                    </a></li>
                </ul>
            </div>
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