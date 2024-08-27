import React, { createContext, useContext, useEffect, useState } from 'react'
import { sendGetRequest } from '../../api-service'
import { FOOD_OPTION } from '../../api-path'
import LoadingContext from './LoadingContext'
import { waitForSecond } from '../../utils'

const FoodOptionContext = createContext()

export function FoodOptionProvider({ children }) {
    const [foodOptions, setFoodOptions] = useState([])
    const { showLoading, hideLoading } = useContext(LoadingContext)

    async function getFoodOptions() {
        try {
            showLoading()
            const res = await sendGetRequest(FOOD_OPTION)
            await waitForSecond() //wait for 0.5s for see anim. can be remove.
            setFoodOptions(res.data)
        } catch (err) {
            console.log(err.message)
        } finally {
            hideLoading()
        }
    }

    useEffect(() => {
        getFoodOptions()
    }, [])

    return (
        <FoodOptionContext.Provider value={{ foodOptions }}>
            {children}
        </FoodOptionContext.Provider>
    )
}

export default FoodOptionContext