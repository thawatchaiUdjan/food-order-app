import React, { createContext, useState } from 'react'
import Loading from '../widgets/Loading'

const LoadingContext = createContext()

export function LoadingProvider({ children }) {
  const [loading, setLoading] = useState(false)
  const [isOverlay, setIsOverlay] = useState(true)

  function showLoading(isOverlay = true) {
    setLoading(true)
    setIsOverlay(isOverlay)
  }

  function hideLoading() {
    setLoading(false)
  }

  return (
    <LoadingContext.Provider value={{ loading, isOverlay, showLoading, hideLoading }}>
      {children}
      {loading && (
        <Loading
          loading={loading}
          isOverlay={isOverlay}
        />)}
    </LoadingContext.Provider>
  )
}

export default LoadingContext