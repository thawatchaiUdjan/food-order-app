import React, { useContext } from 'react'
import OrderContext from '../contexts/OrderContext'
import { getFormattedDateTime } from '../../utils'

export default function OrderCard({ order }) {
    const statuses = ['Prepare', 'Cooking', 'Delivery', 'Ready']
    const { updateStatusOrder } = useContext(OrderContext)

    function onChangeOrderStatus(e) {
        updateStatusOrder(order.order_id, e.target.value)
    }

    return (
        <div className='mx-auto w-3/4'>
            <div className="collapse collapse-arrow bg-white shadow-xl border">
                <input type="radio" name="my-accordion-2" defaultChecked />
                <div className="collapse-title text-xl font-medium">
                    {order.order_id}
                </div>
                <div className="collapse-content pl-7">
                    <hr className='my-2' />

                    <div className='text-black text-opacity-50'>
                        <div>First name: <span className='text-black text-opacity-100'>{order.first_name}</span></div>
                        <div>Last name: <span className='text-black text-opacity-100'>{order.last_name}</span></div>
                        <div>Role: {order.role}</div>
                    </div>

                    <hr className='my-2' />
                    <div className='text-xl font-semibold text-primary'>Total: ${order.total_price}</div>
                    <div className='text-black text-opacity-50'>
                        <div>subtotal: ${order.subtotal_price}</div>
                        <div>delivery: ${order.delivery_price}</div>
                        <div>create at: {getFormattedDateTime(order.created_at)}</div>
                    </div>
                    <hr className='my-4' />
                    <div className='font-semibold mb-2'>Order Status</div>
                    <select className="select select-bordered w-full max-w-xs" value={order.order_status} onChange={onChangeOrderStatus}>
                        {
                            statuses.map((status, index) => (
                                <option key={index} value={index}>{status}</option>
                            ))
                        }
                    </select>
                </div>
            </div>
        </div>
    )
}
