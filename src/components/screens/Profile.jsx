import React from 'react'
import { FoodProvider } from '../contexts/FoodContext'
import { FoodDetailModalProvider } from '../contexts/FoodDetailModalContext'
import { OrderProvider } from '../contexts/OrderContext'
import Navbar from '../widgets/Navbar'
import { FoodCategoryProvider } from '../contexts/FoodCategoryContext'
import { FoodOptionProvider } from '../contexts/FoodOptionContext'
import ProfilePage from '../widgets/ProfilePage'
import { TopUpProvider } from '../contexts/TopUpContext'

export default function Profile() {

  return (
    <>
      <FoodProvider>
        <FoodCategoryProvider>
          <FoodOptionProvider>
            <FoodDetailModalProvider>
              <OrderProvider>
                <TopUpProvider>
                  <Navbar />
                  <ProfilePage />
                </TopUpProvider>
              </OrderProvider>
            </FoodDetailModalProvider>
          </FoodOptionProvider>
        </FoodCategoryProvider>
      </FoodProvider>
    </ >
  )
}