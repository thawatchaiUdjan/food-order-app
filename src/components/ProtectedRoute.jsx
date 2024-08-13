import React from 'react'
import { Navigate } from 'react-router-dom'
import useAuth from '../hooks/useAuth'

export default function ProtectedRoute({ isCheckAdmin = false, children }) {
  const { isAuthenticated, isLoading } = useAuth(isCheckAdmin)

  if (isLoading) {
    return
  }

  if (!isAuthenticated) {
    return <Navigate to={'/login'}/>
  }

  return children
}