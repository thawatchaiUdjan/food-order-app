import React, { useContext } from 'react'
import FoodCategoryContext from '../contexts/FoodCategoryContext'
import FoodCategoryCard from './FoodCategoryCard'

export default function FoodCategoryList() {
    const { category } = useContext(FoodCategoryContext)

    return (
        <div className="mx-8 sm:mx-12 mb-5 pb-5">
            <div className="flex flex-wrap gap-5">
                {category.map((category, index) => (
                    <FoodCategoryCard key={index} category={category} />
                ))}
            </div>
        </div>
    )
}
