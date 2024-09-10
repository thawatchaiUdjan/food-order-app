import React, { createContext, useContext, useState } from 'react'
import { sendGetRequest } from '../../api-service'
import { DELIVERY_OPTION } from '../../api-path'
import LoadingContext from './LoadingContext'
import { waitForSecond } from '../../utils'

const FoodCartContext = createContext()

export function FoodCartProvider({ children }) {
    const defaultDelivery = { delivery_cost: 0 }

    const { showLoading, hideLoading } = useContext(LoadingContext)
    const [deliveryOptions, setDeliveryOptions] = useState([])
    const [foodCarts, setFoodCart] = useState([])
    const [delivery, setDelivery] = useState(defaultDelivery)
    const [location, setLocation] = useState('')

    async function getDeliveryOptions() {
        try {
            showLoading()
            const res = await sendGetRequest(DELIVERY_OPTION)
            await waitForSecond()
            setDeliveryOptions(res.data)
            setDelivery(res.data[1])
        } catch (err) {
            console.log(err)
        } finally {
            hideLoading()
        }
    }

    function addFoodCart({ food, foodOptions }) {
        setFoodCart(foodCarts => [...foodCarts, { food: food, amount: 1, total: food.food_price, option: foodOptions }])
    }

    function removeFoodCart(index) {
        setFoodCart(foodCarts => foodCarts.filter((_, i) => i !== index))
    }

    function addFoodCartAmount(index, amount) {
        const food = foodCarts[index].food
        const total = parseFloat(food.food_price * amount).toFixed(2)
        setFoodCart(foodCarts => foodCarts.map((foodCart, i) =>
            i === index ? { ...foodCart, amount: amount, total: total } : foodCart)
        )
    }

    function clearFoodCart() {
        setFoodCart([])
    }

    function clearDeliveryOption() {
        setDelivery(defaultDelivery)
        setDeliveryOptions([])
    }

    return (
        <FoodCartContext.Provider value={{
            foodCarts,
            delivery,
            deliveryOptions,
            location,
            setLocation,
            setDelivery,
            getDeliveryOptions,
            addFoodCart,
            removeFoodCart,
            addFoodCartAmount,
            clearFoodCart,
            clearDeliveryOption,
        }}>
            {children}
        </FoodCartContext.Provider>
    )
}

export default FoodCartContext