import React, { useContext } from 'react'
import AuthContext from '../contexts/AuthContext'
import OrderContext from '../contexts/OrderContext'

export default function HomeTopHeader() {
    const { user } = useContext(AuthContext)
    const { foodOrder } = useContext(OrderContext)
    
    return (
        <div className={`mx-12 ${foodOrder ? 'mt-6' : 'mt-28'} text-3xl`}>
            <div className="text-primary font-bold mb-3">Hi, <span className="font-medium uppercase">{user.user.first_name}</span></div>
            <span className='font-bold text-primary mr-2'>Special</span>
            <span className='text-primary text-opacity-90'>Food For You</span>
        </div>
    )
}
