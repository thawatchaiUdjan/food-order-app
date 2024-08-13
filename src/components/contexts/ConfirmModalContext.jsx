import React, { createContext, useState } from 'react'
import ConfirmModal from '../widgets/ConfirmModal'

const ConfirmModalContext = createContext()

export function ConfirmModalProvider({ children }) {

  const [detail, setDetail] = useState(null)
  const [isShow, setIsShow] = useState(false)

  function open(detail) {
    setDetail(detail)
    setIsShow(true)
  }

  function close() {
    setIsShow(false)
  }

  return (
    <ConfirmModalContext.Provider value={{ detail, isShow, open, close }}>
      {children}
      <ConfirmModal
        isShow={isShow}
        detail={detail}
        close={close}
      />
    </ConfirmModalContext.Provider>
  )
}

export default ConfirmModalContext