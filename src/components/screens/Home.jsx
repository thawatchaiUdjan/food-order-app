import React, { useContext } from 'react'
import { FoodCategoryProvider } from '../contexts/FoodCategoryContext'
import { FoodProvider } from '../contexts/FoodContext'
import { FoodDetailModalProvider } from '../contexts/FoodDetailModalContext'
import { OrderProvider } from '../contexts/OrderContext'
import FoodCategoryList from '../widgets/FoodCategoryList'
import InputSearchFood from '../widgets/InputSearchFood'
import Navbar from '../widgets/Navbar'
import FoodList from '../widgets/FoodList'
import FoodOrderCard from '../widgets/FoodOrderCard'
import HomeTopHeader from '../widgets/HomeTopHeader'

export default function Home() {
  return (
    <>
      <FoodProvider>
        <FoodDetailModalProvider>
          <OrderProvider>
            <Navbar />
            <FoodCategoryProvider>
              <FoodOrderCard />
              <HomeTopHeader />
              <InputSearchFood />
              <FoodCategoryList />
              <FoodList />
            </FoodCategoryProvider>
          </OrderProvider>
        </FoodDetailModalProvider>
      </FoodProvider>
    </>
  )
}