import React, { useContext } from 'react'
import { FoodProvider } from '../contexts/FoodContext'
import { FoodDetailModalProvider } from '../contexts/FoodDetailModalContext'
import { OrderProvider } from '../contexts/OrderContext'
import Navbar from '../widgets/Navbar'
import FoodOrderList from '../widgets/FoodOrderList'
import { FoodCategoryProvider } from '../contexts/FoodCategoryContext'
import { FoodOptionProvider } from '../contexts/FoodOptionContext'

export default function Order() {
  return (
    <>
      <FoodProvider>
        <FoodCategoryProvider>
          <FoodOptionProvider>
            <FoodDetailModalProvider>
              <OrderProvider>
                <Navbar />
                <FoodOrderList />
              </OrderProvider>
            </FoodDetailModalProvider>
          </FoodOptionProvider>
        </FoodCategoryProvider>
      </FoodProvider>
    </ >
  )
}