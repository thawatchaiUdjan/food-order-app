import React, { useContext, useState, useEffect } from 'react'
import FoodContext from '../contexts/FoodContext'
import FoodCard from './FoodCard'
import FoodCategoryContext from '../contexts/FoodCategoryContext'
import { FoodOptionModalProvider } from '../contexts/FoodOptionModalContext'
import { ExclamationCircleIcon } from '@heroicons/react/24/outline'
import Pagination from './Pagination'
import { scroller, Element } from 'react-scroll'
import LoadingContext from '../contexts/LoadingContext'
import { waitForSecond } from '../../utils'

export default function FoodList() {
    const { selectCategory } = useContext(FoodCategoryContext)
    const { foods, fetchFood, searchFoods } = useContext(FoodContext)
    const [foodListCategory, setFoodListCategory] = useState(0)
    const [currentPage, setCurrentPage] = useState(1)
    const { showLoading, hideLoading } = useContext(LoadingContext)

    const foodPerPage = 6
    const filteredFoods = foods.filter(food => (food.category_id === selectCategory || selectCategory === 0) && searchFoods.some(v => v == food))
    const paginatedFoods = filteredFoods.slice((currentPage - 1) * foodPerPage, currentPage * foodPerPage)
    const totalPages = Math.ceil(filteredFoods.length / foodPerPage)

    function onClickPageChangeButton(page) {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page)
            scrollToFoodTop()
        }
    }

    async function scrollToFoodTop() {
        showLoading()
        await waitForSecond()
        hideLoading()
        scroller.scrollTo('food-category', {
            duration: 1500,
            smooth: 'easeInOutQuart',
            offset: -100,
        })
    }

    useEffect(() => {
        fetchFood()
    }, [])

    useEffect(() => {
        setCurrentPage(1)
    }, [selectCategory, searchFoods])

    return (
        <div className='mx-8 sm:mx-10 my-5'>

            {/* food category */}
            <Element name='food-category' className='flex items-baseline gap-4 sm:ml-2 mb-6'>
                <button className={`text-3xl font-bold text-primary border-primary pb-2
                    ${foodListCategory == 0 ? 'border-b-2' : ''}`}
                    onClick={() => setFoodListCategory(0)}>
                    Popular
                </button>
                <button className={`text-2xl font-medium text-primary text-opacity-90 border-primary pb-2
                ${foodListCategory == 1 ? 'border-b-2' : ''}`}
                    onClick={() => setFoodListCategory(1)}>
                    Recent
                </button>
            </Element>

            {/* foods list & pagination */}
            {
                paginatedFoods.length > 0 ? (
                    <FoodsList
                        foods={paginatedFoods}
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onClick={onClickPageChangeButton}
                    />
                ) : (<NoFoodPage />)
            }

        </div>
    )
}

function FoodsList({ foods, currentPage, totalPages, onClick }) {
    return (
        <>
            <div className='grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
                <FoodOptionModalProvider>
                    {foods.map((food, index) => <FoodCard key={index} food={food} />)}
                </FoodOptionModalProvider>
            </div>
            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onClick={onClick}
            />
        </>
    )
}

function NoFoodPage() {
    return (
        <div className='flex flex-col gap-2 h-72 w-full justify-center items-center text-center text-gray-500'>
            <ExclamationCircleIcon className='size-7 shrink-0' />
            No food here right now. Check back soon!
        </div>
    )
}
