import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { FoodProvider } from '../contexts/FoodContext'
import { FoodDetailModalProvider } from '../contexts/FoodDetailModalContext'
import { OrderProvider } from '../contexts/OrderContext'
import Navbar from '../widgets/Navbar'
import FoodCartContext from '../contexts/FoodCartContext'
import FoodCartOrder from '../widgets/FoodCartOrder'
import { FoodCategoryProvider } from '../contexts/FoodCategoryContext'
import { FoodOptionProvider } from '../contexts/FoodOptionContext'

export default function FoodCart() {
  const { foodCarts } = useContext(FoodCartContext)

  return (
    <>
      <FoodProvider>
        <FoodCategoryProvider>
          <FoodOptionProvider>
            <FoodDetailModalProvider>
              <OrderProvider>
                <Navbar />
                {foodCarts.length > 0 ? (<FoodCartOrder />) : (<FoodNoPage />)}
              </OrderProvider>
            </FoodDetailModalProvider>
          </FoodOptionProvider>
        </FoodCategoryProvider>
      </FoodProvider>
    </ >
  )
}

function FoodNoPage() {
  return (<div className="flex flex-col items-center mt-10 gap-4 pt-20">
    <div className='text-lg text-gray-500'>...Oops! No yummy treats yet!</div>
    <Link to={'/'}><button className='btn btn-primary text-md'>Lets Go Shopping!</button></Link>
  </div>)
}