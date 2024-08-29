import React, { createContext, useState } from 'react'
import TopUpModal from '../widgets/TopUpModal'

const TopUpContext = createContext()

export const TopUpProvider = ({ children }) => {
    const [isShow, setIsShow] = useState(false)

    function showTopUp() {
        setIsShow(true)
    }

    function hideTopUp() {
        setIsShow(false)
    }

    return (
        <TopUpContext.Provider value={{ showTopUp }}>
            {children}
            {isShow && (
                <TopUpModal
                    close={hideTopUp}
                />
            )}
        </TopUpContext.Provider>
    )
}

export default TopUpContext