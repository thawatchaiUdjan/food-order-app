import React, { createContext, useEffect, useState } from 'react'
import { sendGetRequest } from '../../api-service'
import { FOOD_OPTION } from '../../api-path'

const FoodOptionContext = createContext()

export function FoodOptionProvider({ children }) {
    const [foodOptions, setFoodOptions] = useState([])

    async function getFoodOptions() {
        const res = await sendGetRequest(FOOD_OPTION)
        setFoodOptions(res.data)
    }

    useEffect(() => {
        getFoodOptions()
    }, []);

    return (
        <FoodOptionContext.Provider value={{ foodOptions }}>
            {children}
        </FoodOptionContext.Provider>
    )
}

export default FoodOptionContext