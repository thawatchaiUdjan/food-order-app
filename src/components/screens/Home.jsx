import React from 'react'
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
import { FoodOptionProvider } from '../contexts/FoodOptionContext'
import { FoodSortingProvider } from '../contexts/FoodSortingContext'
import FoodSortingMenu from '../widgets/FoodSortingMenu'

export default function Home() {
  return (
    <>
      <FoodProvider>
        <FoodCategoryProvider>
          <FoodOptionProvider>
            <FoodDetailModalProvider>
              <OrderProvider>
                <FoodSortingProvider>
                  <Navbar />
                  <FoodOrderCard />
                  <HomeTopHeader />
                  <InputSearchFood />
                  <FoodCategoryList />
                  <FoodSortingMenu/>
                  <FoodList />
                </FoodSortingProvider>
              </OrderProvider>
            </FoodDetailModalProvider>
          </FoodOptionProvider>
        </FoodCategoryProvider>
      </FoodProvider>
    </>
  )
}