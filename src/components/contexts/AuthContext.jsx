import React, { createContext, useState } from 'react'
import { sendPostRequest } from '../../api-service'
import { USER_FACEBOOK_LOGIN, USER_GOOGLE_LOGIN, USER_LOGIN, USER_REGISTER } from '../../api-path'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState({ user: getUser(), token: getToken() })
    const [isAdmin, setIsAdmin] = useState(user.user && user.user.role == 'admin')

    async function login(data) {
        try {
            const res = await sendPostRequest(USER_LOGIN, data, false)
            setUserData(res.data)
        } catch (err) {
            console.log(err.response.data.message)
            throw err
        }
    }

    async function register(data) {
        try {
            const res = await sendPostRequest(USER_REGISTER, data, false)
            setUserData(res.data)
        } catch (err) {
            console.log(err.response.data.message)
            throw err
        }
    }

    async function googleLogin(data) {
        try {
            const res = await sendPostRequest(USER_GOOGLE_LOGIN, data, false)
            setUserData(res.data)
        } catch (err) {
            console.log(err.response.data.message)
            throw err
        }
    }

    async function facebookLogin(data) {
        try {
            const res = await sendPostRequest(USER_FACEBOOK_LOGIN, data, false)            
            setUserData(res.data)
        } catch (err) {
            console.log(err.response.data.message)
            throw err
        }
    }

    function logout() {
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        setUser({ user: null, token: null })
    }

    function setUserData(data) {
        localStorage.setItem('token', data.token)
        localStorage.setItem('user', JSON.stringify(data.user))
        setUser({ user: data.user, token: data.token })
        setIsAdmin(data.user.role == 'admin')
    }

    function getToken() {
        return localStorage.getItem('token')
    }

    function getUser() {
        return JSON.parse(localStorage.getItem('user'))
    }

    return (
        <AuthContext.Provider value={{ user, isAdmin, login, register, logout, googleLogin, facebookLogin }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext