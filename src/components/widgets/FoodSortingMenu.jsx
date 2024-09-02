import { BarsArrowDownIcon, BarsArrowUpIcon } from '@heroicons/react/24/outline'
import React, { useContext } from 'react'
import FoodSortingContext from '../contexts/FoodSortingContext'

export default function FoodSortingMenu() {
    const { sorts, sort, order, setOrder, setSort } = useContext(FoodSortingContext)

    return (
        <div className="mx-8 sm:mx-12 mb-8">
            <div className='flex justify-end h-11 lg:mt-[-75px]'>
                <div className="dropdown dropdown-end w-full lg:w-32">
                    <div className="flex items-center text-md text-center rounded-xl border-2 font-semibold text-gray-500 bg-white h-full shadow-md 
                        hover:text-primary hover:border-primary hover:transition hover:duration-300 hover:ease-in-out">
                        <div tabIndex={0} role="button" className='flex-1'>
                            {sort.name}
                        </div>
                        <div className='btn btn-ghost btn-circle min-h-0 size-8 mr-3' onClick={() => setOrder(order ^ 1)}>
                            {
                                order == 0 ? <BarsArrowDownIcon className='size-6' /> : <BarsArrowUpIcon className='size-6' />
                            }
                        </div>
                    </div>
                    <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-full p-2 mt-1 text-gray-500 font-semibold shadow-md">
                        {
                            sorts.map((sort, index) => (
                                <li key={index} onClick={() => setSort(sort)}><a>{sort.name}</a></li>
                            ))
                        }
                    </ul>
                </div>
            </div>
        </div>
    )
}