import React, { useContext } from 'react'
import FoodCartContext from '../contexts/FoodCartContext'
import FoodCartCard from './FoodCartCard'

export default function FoodCartList() {
    const { foodCarts } = useContext(FoodCartContext)

    return (
        <div className='flex flex-col items-center gap-4'>
            {
                foodCarts.map((foodCart, index) => (
                    (<FoodCartCard key={index} foodCartIndex={index} foodCart={foodCart}></FoodCartCard>)
                ))
            }
        </div>

    )
}
