import React, { createContext, useState } from 'react'
import FoodDetailModal from '../widgets/FoodDetailModal'

const FoodDetailModalContext = createContext()

export function FoodDetailModalProvider({ children }) {
  const defaultFood = {
    food_id: '',
    food_name: '',
    food_price: '',
    food_price_discount: '',
    food_description: '',
    food_image_url: '',
  }
  const [food, setFood] = useState(defaultFood)
  const [isNew, setIsNew] = useState(false)
  const [isShow, setIsShow] = useState(false)

  function open(food = defaultFood) {
    setIsNew(food === defaultFood)
    setFood(food)
    setIsShow(true)
  }

  function close() {
    setFood(defaultFood)
    setIsShow(false)
  }

  return (
    <FoodDetailModalContext.Provider value={{ food, isNew, isShow, open, close }}>
      {children}
      <FoodDetailModal
        food={food}
        isShow={isShow}
        isNew={isNew}
        close={close}
      />
    </FoodDetailModalContext.Provider>
  )
}

export default FoodDetailModalContext