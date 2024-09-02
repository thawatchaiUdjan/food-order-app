import React, { createContext, useState } from 'react'

const FoodSortingContext = createContext()

export function FoodSortingProvider({ children }) {
    const sorts = [
        { key: 'food_name', name: 'Name' },
        { key: 'food_price', name: 'Price' }
    ]
    const [order, setOrder] = useState(0)
    const [sort, setSort] = useState(sorts[0])

    return (
        <FoodSortingContext.Provider value={{ sorts, order, sort, setOrder, setSort }}>
            {children}
        </FoodSortingContext.Provider>
    )
}

export default FoodSortingContext