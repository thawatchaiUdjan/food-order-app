import React, { useContext } from 'react'
import { ArrowTopRightOnSquareIcon } from '@heroicons/react/24/solid'
import FoodDetailModalContext from '../contexts/FoodDetailModalContext'
import FoodCartContext from '../contexts/FoodCartContext'
import OrderContext from '../contexts/OrderContext'
import AuthContext from '../contexts/AuthContext'

export default function FoodCard({ food }) {
  const { open } = useContext(FoodDetailModalContext)
  const { addFoodCart } = useContext(FoodCartContext)
  const { foodOrder } = useContext(OrderContext)
  const { isAdmin } = useContext(AuthContext)

  function onClickBuyButton() {
    addFoodCart(food)
  }

  function onClickDetailButton() {
    open(food)
  }

  return (
    <div className="flex-shrink-0 w-96">
      <div className="relative bg-white shadow-lg overflow-hidden m-4">
        <EditFoodButton isAdmin={isAdmin} onClick={onClickDetailButton} />
        <img src={food.food_image_url ? food.food_image_url : 'https://www.achivr.in/cdn/shop/products/no-image-available-grid_5ad88fe4-3f32-4194-b9df-8fda72817a72.jpg?v=1554983465'}
          alt={food.food_name}
          className="w-full h-48 object-cover" />
        <div className="p-9">
          <p className="text-3xl text-primary font-thin truncate">{food.food_name}</p>
          <p className="flex flex-row justify-start items-center my-2">
            <span className="text-primary text-2xl text-opacity-70">{food.food_price}$</span>
            <span className="text-sm text-gray-400 line-through ml-2">{food.food_price_discount}$</span>
          </p>
          <p className="text-gray-400 text-base italic mb-6 h-24 overflow-y-auto whitespace-normal">{food.food_description}</p>
          <button
            className="btn btn-outline btn-primary border-2 uppercase px-8 rounded-full"
            disabled={foodOrder != null}
            onClick={onClickBuyButton}>
            Buy Now
          </button>
        </div>
      </div>
    </div>
  )
}

function EditFoodButton({ onClick, isAdmin }) {
  return isAdmin && (
    <button onClick={onClick} className="absolute top-4 right-4 p-2 rounded-full shadow-md bg-white">
      <ArrowTopRightOnSquareIcon className="size-5 text-black" />
    </button>
  )
}
