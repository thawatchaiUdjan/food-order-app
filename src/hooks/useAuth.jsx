import { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { sendGetRequest } from '../api-service'
import { USER_VERIFY_TOKEN } from '../api-path'
import AuthContext from '../components/contexts/AuthContext'
import LoadingContext from '../components/contexts/LoadingContext'
import AlertMessageContext from '../components/contexts/AlertMessageContext'

export default function useAuth(isCheckAdmin) {
  const { user, logout } = useContext(AuthContext)
  const { hideLoading } = useContext(LoadingContext)
  const { showAlert } = useContext(AlertMessageContext)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const navigate = useNavigate()

  async function checkAuth() {
    if (user.token) {
      try {
        setIsLoading(true)
        await sendGetRequest(USER_VERIFY_TOKEN)
        setIsAuthenticated(isCheckAdmin ? user.user && user.user.role == 'admin' : true)
      } catch (err) {
        logout()
        setIsAuthenticated(false)
        navigate('/login')
        hideLoading()
        showAlert('error', err.response.data.message)
        console.log(err.response.data.message)
      }
    } else {
      setIsAuthenticated(false)
      navigate('/login')
    }
    setIsLoading(false)
  }

  useEffect(() => {
    checkAuth()
  }, [navigate])

  return ({ isAuthenticated, isLoading })
}