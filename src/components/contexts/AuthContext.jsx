import React, { createContext, useContext, useEffect, useState } from 'react'
import { sendDeleteRequest, sendGetRequest, sendPostRequest, sendPutRequest } from '../../api-service'
import { USER_FACEBOOK_LOGIN, USER_GET, USER_GOOGLE_LOGIN, USER_LOGIN, USER_REGISTER } from '../../api-path'
import LoadingContext from './LoadingContext'
import { waitForSecond } from '../../utils'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const { showLoading, hideLoading } = useContext(LoadingContext)
    const [user, setUser] = useState({ user: getUser(), token: getToken() })
    const [isAdmin, setIsAdmin] = useState(user.user && (user.user.role == 'admin' || user.user.role == 'owner'))

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

    async function updateUser(data) {
        try {
            showLoading(false)
            const res = await sendPutRequest(USER_GET, data)
            await waitForSecond()
            setUserData(res.data.user)
        } catch (err) {
            console.log(err.response.data.message)
            throw err
        } finally {
            hideLoading()
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
        setIsAdmin(data.user.role == 'admin' || data.user.role == 'owner')
    }

    function getToken() {
        return localStorage.getItem('token')
    }

    function getUser() {
        return JSON.parse(localStorage.getItem('user'))
    }

    async function getUserData() {
        try {
            showLoading()
            const res = await sendGetRequest(USER_GET)
            await waitForSecond()
            setUserData(res.data)
        } catch (err) {
            console.log(err.response.data.message)
            logout()
        } finally {
            hideLoading()
        }
    }

    async function deleteUser() {
        try {
            showLoading(false)
            const res = await sendDeleteRequest(USER_GET)
            await waitForSecond(1000)
            logout()
        } catch (err) {
            console.log(err.response.data.message)
            throw err
        } finally {
            hideLoading()
        }
    }

    useEffect(() => {
        getUserData()
    }, [])

    return (
        <AuthContext.Provider value={{ user, isAdmin, updateUser, deleteUser, setUserData, login, register, logout, googleLogin, facebookLogin }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext