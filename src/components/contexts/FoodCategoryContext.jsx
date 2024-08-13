import { logFormData, waitForSecond } from '../../utils'
import React, { createContext, useState, useContext } from 'react'
import LoadingContext from './LoadingContext'
import AlertMessageContext from './AlertMessageContext'
import { sendDeleteRequest, sendGetRequest, sendPostRequest, sendPutRequest } from '../../api-service'
import { CATEGORY_GET } from '../../api-path'

const FoodCategoryContext = createContext()

export function FoodCategoryProvider({ children }) {
  const [category, setCategory] = useState([])
  const [selectCategory, setSelectCategory] = useState(0)
  const { showLoading, hideLoading } = useContext(LoadingContext)
  const { showAlert } = useContext(AlertMessageContext)
  const defaultCategory = {
    category_id: 0,
    category_name: 'All'
  }

  async function fetchCategory() {
    try {
      showLoading()
      const res = await sendGetRequest(CATEGORY_GET)
      setCategory(res.data)
      addCategory(defaultCategory)
    } catch (err) {
      console.log(err.response.data.message)
    }
  }

  async function deleteCategory(categoryId) {
    try {
      showLoading()
      const res = await sendDeleteRequest(`${CATEGORY_GET}/${categoryId}`)
      await waitForSecond() //wait for 0.5s for see anim. can be remove.
      deleteCategories(categoryId)
      showAlert('success', res.data.message)
    } catch (err) {
      console.log(err.response.data.message)
      showAlert('error', 'An error occurred, Please try again later')
    } finally {
      hideLoading()
    }
  }

  async function updateCategory(categoryId, category) {
    try {
      showLoading(false)
      const res = await sendPutRequest(`${CATEGORY_GET}/${categoryId}`, category)
      await waitForSecond() //wait for 0.5s for see anim. can be remove.
      updateCategories(res.data.food)
      showAlert('success', res.data.message)
    } catch (err) {
      console.log(err.response.data.message)
      showAlert('error', 'An error occurred, Please try again later')
    } finally {
      hideLoading()
    }
  }

  async function createCategory(category) {
    try {
      showLoading(false)
      const res = await sendPostRequest(CATEGORY_GET, category)
      await waitForSecond() //wait for 0.5s for see anim. can be remove.
      addCategory(res.data.food)
      showAlert('success', res.data.message)
    } catch (err) {
      showAlert('error', 'An error occurred, Please try again later')
      console.log(err.response.data.message)
    } finally {
      hideLoading()
    }
  }

  function addCategory(category) {
    setCategory(categories => [{ ...category }, ...categories])
  }

  function updateCategories(category) {
    setCategory(categories => categories.map(v => v.category_id === category.category_id ? { ...v, ...category } : v))
  }

  function deleteCategories(categoryId) {
    setCategory(categories => categories.filter(category => category.category_id !== categoryId))
  }

  return (
    <FoodCategoryContext.Provider value={{ category, selectCategory, setSelectCategory, fetchCategory, deleteCategory, updateCategory, createCategory }}>
      {children}
    </FoodCategoryContext.Provider>
  )
}

export default FoodCategoryContext