import React, { useContext } from 'react'
import FoodCategoryContext from '../contexts/FoodCategoryContext'

export default function FoodCategoryCard({ category }) {
  const { selectCategory, setSelectCategory } = useContext(FoodCategoryContext)

  return (
    <button
      key={category.category_id}
      className={`px-5 py-2 text-md font-semibold text-center rounded-xl border-2 shadow-md bg-white
      ${selectCategory === category.category_id ? 'border border-primary text-primary' : 'text-gray-500'}
      hover:text-primary hover:border-primary hover:transition hover:duration-300 hover:ease-in-out`}
      onClick={() => setSelectCategory(category.category_id)}>
      {category.category_name}
    </button>
  )
}
