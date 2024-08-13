import React, { useContext, useState, useEffect } from 'react'
import FoodContext from '../contexts/FoodContext'
import FoodCard from './FoodCard'
import FoodCategoryContext from '../contexts/FoodCategoryContext'

export default function FoodList() {
    const { selectCategory } = useContext(FoodCategoryContext)
    const { foods, fetchFood, searchFoods } = useContext(FoodContext)
    const [foodListCategory, setFoodListCategory] = useState(0)

    useEffect(() => {
        fetchFood()
    }, [])

    return (
        <div className='mx-10 my-5'>
            <div className='flex items-baseline gap-4 ml-2 mb-2'>
                <button className={`text-3xl font-bold text-primary border-primary pb-2
                    ${foodListCategory == 0 ? 'border-b-2' : ''}`}
                    onClick={() => setFoodListCategory(0)}>
                    Popular
                </button>
                <button className={`text-2xl font-medium text-primary text-opacity-90 border-primary pb-2
                ${foodListCategory == 1 ? 'border-b-2' : ''}`}
                    onClick={() => setFoodListCategory(1)}>
                    Resent
                </button>
            </div>
            <div className='grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
                {
                    foods.map((food, index) => (
                        (food.category_id === selectCategory || selectCategory === 0) && searchFoods.some(v => v === food) &&
                        (<FoodCard key={index} food={food} />)
                    ))
                }
            </div>
        </div>

    )
}
