import React from 'react'
import { CheckCircleIcon, XCircleIcon, ExclamationCircleIcon } from '@heroicons/react/24/outline'

export default function AlertMessage({ type, message }) {

    const alertType = {
        success: {
            icon: <CheckCircleIcon className="size-6" />,
            type: "alert-success",
        },
        error: {
            icon: <XCircleIcon className="size-6" />,
            type: "alert-error",
        },
        warning: {
            icon: <ExclamationCircleIcon className="size-6" />,
            type: "alert-warning",
        },
    }

    const alert = alertType[type] || {}

    return (
        <div role="alert" className={`${alert.type} alert fixed top-3 inset-x-0 mx-auto w-1/3 text-white shadow-lg z-50`}>
            {alert.icon}
            <span>{message}</span>
        </div>
    )
}
