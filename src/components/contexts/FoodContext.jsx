import { logFormData, waitForSecond } from '../../utils'
import React, { createContext, useState, useContext } from 'react'
import LoadingContext from './LoadingContext'
import AlertMessageContext from './AlertMessageContext'
import { sendDeleteRequest, sendGetRequest, sendPostRequest, sendPutRequest } from '../../api-service'
import { FOOD_GET } from '../../api-path'

const FoodContext = createContext()

export function FoodProvider({ children }) {
  const [foods, setFoods] = useState([])
  const [searchFoods, setSearchFoods] = useState([])
  const { showLoading, hideLoading } = useContext(LoadingContext)
  const { showAlert } = useContext(AlertMessageContext)

  async function fetchFood() {
    try {
      showLoading()
      const res = await sendGetRequest(FOOD_GET)
      await waitForSecond() //wait for 0.5s for see anim. can be remove.
      setFoods(res.data)
      setSearchFoods(res.data)
      hideLoading()
    } catch (err) {
      console.log(err.response.data.message)
    }
  }

  async function deleteFood(foodId) {
    try {
      showLoading()
      const res = await sendDeleteRequest(`${FOOD_GET}/${foodId}`)
      await waitForSecond() //wait for 0.5s for see anim. can be remove.
      deleteFoods(foodId)
      showAlert('success', res.data.message)
    } catch (err) {
      console.log(err.response.data.message)
      showAlert('error', 'An error occurred, Please try again later')
    } finally {
      hideLoading()
    }
  }

  async function updateFood(foodId, food) {
    try {
      showLoading(false)
      const res = await sendPutRequest(`${FOOD_GET}/${foodId}`, food)
      await waitForSecond() //wait for 0.5s for see anim. can be remove.
      updateFoods(res.data.food)
      showAlert('success', res.data.message)
    } catch (err) {
      console.log(err.response.data.message)
      showAlert('error', 'An error occurred, Please try again later')
    } finally {
      hideLoading()
    }
  }

  async function createFood(food) {
    try {
      showLoading(false)
      const res = await sendPostRequest(FOOD_GET, food)
      await waitForSecond() //wait for 0.5s for see anim. can be remove.
      addFoods(res.data.food)
      showAlert('success', res.data.message)
    } catch (err) {
      showAlert('error', 'An error occurred, Please try again later')
      console.log(err.response.data.message)
    } finally {
      hideLoading()
    }
  }

  function addFoods(food) {
    setFoods(foods => [{ ...food }, ...foods])
  }

  function updateFoods(food) {
    setFoods(foods => foods.map(v => v.food_id === food.food_id ? { ...v, ...food } : v))
  }

  function deleteFoods(foodId) {
    setFoods(foods => foods.filter(food => food.food_id !== foodId))
  }

  return (
    <FoodContext.Provider value={{ foods, searchFoods, setSearchFoods, fetchFood, deleteFood, updateFood, createFood }}>
      {children}
    </FoodContext.Provider>
  )
}

export default FoodContext