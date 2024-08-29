import { logFormData, waitForSecond } from '../../utils'
import React, { createContext, useContext, useState } from 'react'
import { sendDeleteRequest, sendGetRequest, sendPostRequest, sendPutRequest } from '../../api-service'
import { ORDER_ALL, ORDER_GET, ORDER_STATUS } from '../../api-path'
import LoadingContext from './LoadingContext'
import AlertMessageContext from './AlertMessageContext'
import Swal from 'sweetalert2'

const OrderContext = createContext()

export function OrderProvider({ children }) {
    const [foodOrder, SetFoodOrder] = useState(null)
    const [allFoodOrder, SetAllFoodOrder] = useState([])
    const [orderStatus, SetOrderStatus] = useState([])
    const { showLoading, hideLoading } = useContext(LoadingContext)
    const { showAlert } = useContext(AlertMessageContext)

    async function getOrder() {
        try {
            showLoading()
            const res = await sendGetRequest(ORDER_GET)
            SetFoodOrder(res.data)
        } catch (err) {
            console.log(err.response.data.message)
        }
    }

    async function getAllOrder() {
        try {
            showLoading()
            const allOrder = await sendGetRequest(ORDER_ALL)
            const orderStatus = await sendGetRequest(ORDER_STATUS)
            SetAllFoodOrder(allOrder.data)
            SetOrderStatus(orderStatus.data)
        } catch (err) {
            console.log(err.response.data.message)
        } finally {
            hideLoading()
        }
    }

    async function createOrder(order) {
        try {
            showLoading(false)
            const res = await sendPostRequest(ORDER_GET, order)
            await waitForSecond(800) //wait for 0.5s for see anim. can be remove.
            SetFoodOrder(res.data.foodOrder)
            Swal.fire({
                icon: "success",
                text: res.data.message,
                showConfirmButton: false,
                timer: 3000
            })
        } catch (err) {
            console.log(err.response.data.message)
            showAlert('error', err.response.data.message)
        } finally {
            hideLoading()
        }
    }

    async function cancelOrder() {
        try {
            showLoading(false)
            const res = await sendDeleteRequest(`${ORDER_GET}/${foodOrder.order.order_id}`)
            await waitForSecond() //wait for 0.5s for see anim. can be remove.
            SetFoodOrder(null)
            showAlert('success', res.data.message)
        } catch (err) {
            console.log(err.response.data.message)
            showAlert('error', err.response.data.message)
        } finally {
            hideLoading()
        }
    }

    async function updateStatusOrder(orderId, orderStatus) {
        try {
            showLoading()
            const res = await sendPutRequest(`${ORDER_GET}/${orderId}/${orderStatus}`)
            updateAllFoodOrder(res.data.order)
            showAlert('success', res.data.message)
        } catch (err) {
            console.log(err.response.data.message)
            showAlert('error', err.response.data.message)
        } finally {
            hideLoading()
        }
    }

    function updateAllFoodOrder(order) {
        SetAllFoodOrder(orders => orders.map(v => v.order_id === order.order_id ? { ...v, ...order } : v))
    }

    return (
        <OrderContext.Provider value={{ foodOrder, allFoodOrder, orderStatus, getAllOrder, getOrder, createOrder, cancelOrder, updateStatusOrder }}>
            {children}
        </OrderContext.Provider>
    )
}

export default OrderContext