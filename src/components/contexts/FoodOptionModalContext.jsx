import React, { createContext, useState } from 'react'
import FoodDetailModal from '../widgets/FoodDetailModal'
import FoodOptionModal from '../widgets/FoodOptionModal'

const FoodOptionModalContext = createContext()

export function FoodOptionModalProvider({ children }) {
  const defaultFood = {
    food_id: '',
    food_name: '',
    food_price: '',
    food_price_discount: '',
    food_description: '',
    food_image_url: '',
    food_options: [],
  }
  const [food, setFood] = useState(defaultFood)
  const [isShow, setIsShow] = useState(false)

  function openFoodOption(food) {
    setFood(food)
    setIsShow(true)
  }

  function close() {
    setFood(defaultFood)
    setIsShow(false)
  }

  return (
    <FoodOptionModalContext.Provider value={{ food, isShow, openFoodOption, close }}>
      {children}
      <FoodOptionModal
        food={food}
        isShow={isShow}
        close={close}
      />
    </FoodOptionModalContext.Provider>
  )
}

export default FoodOptionModalContext