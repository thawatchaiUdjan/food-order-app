import React from 'react'
import { CheckCircleIcon, XCircleIcon, ExclamationCircleIcon } from '@heroicons/react/24/outline'

export default function AlertMessage({ type, message }) {

    const alertType = {
        success: {
            icon: <CheckCircleIcon className="size-6 flex-shrink-0" />,
            type: "alert-success",
        },
        error: {
            icon: <XCircleIcon className="size-6 flex-shrink-0" />,
            type: "alert-error",
        },
        warning: {
            icon: <ExclamationCircleIcon className="size-6 flex-shrink-0" />,
            type: "alert-warning",
        },
    }

    const alert = alertType[type] || {}

    return (
        <div className='fixed top-3 inset-x-0 mx-5 md:mx-auto md:w-[450px] z-50'>
            <div role="alert" className={`${alert.type} alert flex flex-row text-white shadow-lg `}>
                {alert.icon}
                <span className='truncate'>{message}</span>
            </div>
        </div>
    )
}
