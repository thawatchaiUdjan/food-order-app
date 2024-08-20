import React, { createContext, useState } from 'react'

const FoodCartContext = createContext()

export function FoodCartProvider({ children }) {
    const [foodCarts, setFoodCart] = useState([])

    function addFoodCart({food, foodOptions}) {
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

    return (
        <FoodCartContext.Provider value={{ foodCarts, addFoodCart, removeFoodCart, addFoodCartAmount, clearFoodCart }}>
            {children}
        </FoodCartContext.Provider>
    )
}

export default FoodCartContext