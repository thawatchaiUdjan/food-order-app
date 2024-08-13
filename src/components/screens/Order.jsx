import React, { useContext } from 'react'
import { FoodProvider } from '../contexts/FoodContext'
import { FoodDetailModalProvider } from '../contexts/FoodDetailModalContext'
import { OrderProvider } from '../contexts/OrderContext'
import Navbar from '../widgets/Navbar'
import FoodOrderList from '../widgets/FoodOrderList'

export default function Order() {
  return (
    <>
      <FoodProvider>
        <FoodDetailModalProvider>
          <OrderProvider>
            <Navbar />
            <FoodOrderList />
          </OrderProvider>
        </FoodDetailModalProvider>
      </FoodProvider>
    </ >
  )
}