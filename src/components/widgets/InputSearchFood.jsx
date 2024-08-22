import React, { useContext, useEffect, useState } from 'react'
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid'
import FoodContext from '../contexts/FoodContext'

export default function InputSearchFood() {
    const { foods, setSearchFoods } = useContext(FoodContext)
    const [ value, setValue ] = useState('')

    function onChangeSearchInput(e) {
        const value = e.target.value.toLowerCase()
        setValue(value)
        filterSearchFood(value)
    }

    function filterSearchFood(value) {
        const result = foods.filter(food =>
            food.food_name.toLowerCase().includes(value)
        )
        setSearchFoods(result)
    }

    useEffect(() => {
        filterSearchFood(value)
    }, [foods])

    return (
        <div className='mx-8 sm:mx-12 mt-6 my-4'>
            <label className="input input-bordered flex items-center gap-2 shadow-md">
                <MagnifyingGlassIcon className='size-4' />
                <input type="text" className="grow" placeholder="Search here" onChange={onChangeSearchInput} />
            </label>
        </div>
    )
}
