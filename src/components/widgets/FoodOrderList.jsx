import React, { useContext, useEffect } from 'react'
import OrderContext from '../contexts/OrderContext'
import OrderCard from './OrderCard'

export default function FoodOrderList() {
    const { allFoodOrder, getOrder, getAllOrder } = useContext(OrderContext)

    useEffect(() => {
        getAllOrder()
        getOrder()
    }, [])

    return (
        allFoodOrder && allFoodOrder.length > 0 ? <OrderList allFoodOrder={allFoodOrder} /> : <OrderNoPage />
    )
}

function OrderList({ allFoodOrder }) {
    return (
        <>
            <div className='text-2xl text-center text-primary mt-28 mb-5'>Orders</div>
            {allFoodOrder.map((order, index) => (<OrderCard key={index} order={order} />))}
        </>
    )
}

function OrderNoPage() {
    return (
        <div className="flex flex-col items-center mt-10 gap-4 pt-20">
            <div className='text-lg text-gray-500'>No orders</div>
        </div>
    )
}
