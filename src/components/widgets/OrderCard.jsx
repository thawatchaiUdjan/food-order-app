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
                <div className="collapse-title text-xl font-medium overflow-hidden text-ellipsis whitespace-nowrap sm:w-full">
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
                        <div>
                            <span className='text-black text-opacity-100'>first name:</span>
                            {order.first_name}
                        </div>
                        <div>
                            <span className='text-black text-opacity-100'>last name:</span>
                            {order.last_name}
                        </div>
                        <div>
                            <span className='text-black text-opacity-100'>role:</span>
                            {order.role}
                        </div>
                    </div>

                    {/* order info */}
                    <hr className='my-2' />
                    <div className='text-xl font-semibold text-primary'>Total: ${order.total_price}</div>
                    <div className='text-black text-opacity-50'>
                        <div><span className='text-black text-opacity-100'>subtotal:</span> ${order.subtotal_price}</div>
                        <div>
                            <span className='text-black text-opacity-100'>{order.delivery_option.delivery_name.toLowerCase()}:</span>
                            ${order.delivery_option.delivery_cost}
                        </div>
                        <div><span className='text-black text-opacity-100'>create at:</span> {getFormattedDateTime(order.created_at)}</div>
                        <div><span className='text-black text-opacity-100'>address:</span> {order.order_address}</div>
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
