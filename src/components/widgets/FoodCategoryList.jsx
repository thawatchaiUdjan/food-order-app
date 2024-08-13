import React, { useContext, useEffect } from 'react'
import FoodCategoryContext from '../contexts/FoodCategoryContext'
import FoodCategoryCard from './FoodCategoryCard'

export default function FoodCategoryList() {
    const { category, fetchCategory } = useContext(FoodCategoryContext)

    useEffect(() => {
        fetchCategory()
    }, [])

    return (
        <div className="mx-12 mb-5 pb-5 overflow-x-auto">
            <div className="flex gap-5">
                {category.map((category, index) => (
                    <FoodCategoryCard key={index} category={category} />
                ))}
            </div>
        </div>
    )
}
