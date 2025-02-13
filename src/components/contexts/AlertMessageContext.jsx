import React, { createContext, useState } from 'react'
import AlertMessage from '../widgets/AlertMessage'

const AlertMessageContext = createContext()

export const AlertMessageProvider = ({ children }) => {
    const DELAY = 3000
    const [alert, setAlert] = useState(null)
    const [timeOut, setTimeOut] = useState(null)

    async function showAlert(type, message) {
        setAlert(null)
        await new Promise(resolve => setTimeout(resolve, 1))
        setAlert({ type, message })
        clearTimeout(timeOut)
        setTimeOut(setTimeout(() => setAlert(null), DELAY))
    }

    return (
        <AlertMessageContext.Provider value={{ showAlert }}>
            {children}
            {alert && (
                <AlertMessage
                    type={alert.type}
                    message={alert.message}
                />
            )}
        </AlertMessageContext.Provider>
    )
}

export default AlertMessageContext