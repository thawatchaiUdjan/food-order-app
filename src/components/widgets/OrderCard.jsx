import React, { useContext } from 'react'
import OrderContext from '../contexts/OrderContext'
import { getFormattedDateTime } from '../../utils'
import OrderFoodDetail from './OrderFoodDetail'

export default function OrderCard({ order }) {
    const { orderStatus, updateStatusOrder } = useContext(OrderContext)

    function onChangeOrderStatus(e) {
        updateStatusOrder(order.order_id, e.target.value)
    }

    return (
        <div className='mx-auto w-3/4'>
            <div className="collapse collapse-arrow bg-white shadow-xl border px-3">
                <input type="radio" name="my-accordion-2" defaultChecked />
                <div className="collapse-title text-xl font-medium overflow-hidden text-ellipsis whitespace-nowrap w-1/2 sm:w-full">
                    {order.order_id}
                </div>
                <div className="collapse-content">

                    {/* food info */}
                    <hr className='mb-2' />
                    {
                        order.foods.map((food, index) => (<OrderFoodDetail key={index} food={food} />))
                    }

                    {/* user info */}
                    <hr className='my-2' />
                    <div className='text-black text-opacity-50'>
                        <div>first name: <span className='text-black text-opacity-100'>{order.first_name}</span></div>
                        <div>last name: <span className='text-black text-opacity-100'>{order.last_name}</span></div>
                        <div>role: {order.role}</div>
                    </div>

                    {/* order info */}
                    <hr className='my-2' />
                    <div className='text-xl font-semibold text-primary'>Total: ${order.total_price}</div>
                    <div className='text-black text-opacity-50'>
                        <div>subtotal: ${order.subtotal_price}</div>
                        <div>{order.delivery_option.delivery_name.toLowerCase()}: ${order.delivery_option.delivery_cost}</div>
                        <div>create at: {getFormattedDateTime(order.created_at)}</div>
                        <div>address: {order.order_address}</div>
                    </div>

                    {/* order update info */}
                    <hr className='my-4' />
                    <div className='text-xl mb-2'>Order Status</div>
                    <select className="select select-bordered w-full max-w-xs" value={order.order_status} onChange={onChangeOrderStatus}>
                        {
                            orderStatus.map((status, index) => (
                                <option key={index} value={status._id}>{status.status_name}</option>
                            ))
                        }
                    </select>
                </div>
            </div>
        </div>
    )
}
