import { useGoogleLogin } from '@react-oauth/google'
import React, { useContext } from 'react'
import AuthContext from '../contexts/AuthContext'
import LoadingContext from '../contexts/LoadingContext'
import { useNavigate } from 'react-router-dom'

export default function GoogleLoginButton() {
    const navigate = useNavigate()
    const { googleLogin } = useContext(AuthContext)
    const { showLoading, hideLoading } = useContext(LoadingContext)

    async function onSignInSuccess(response) {
        try {
            await googleLogin({ code: response.code })
            navigate('/')
        } catch (err) {
            console.log('Google Sign-In Error', err.message)
        } finally {
            hideLoading()
        }
    }

    function onSignInError(err) {
        console.log('Google Sign-In Error:', err.message)
        hideLoading()
    }

    function onNoneSignIn(err) {
        console.warn('Google Sign-In warning:', err.message)
        hideLoading()
    }

    const googleSignIn = useGoogleLogin({
        onSuccess: onSignInSuccess,
        onError: onSignInError,
        onNonOAuthError: onNoneSignIn,
        flow: 'auth-code',
    })

    function onClickGoogleLogin() {
        showLoading(false)
        googleSignIn()
    }

    return (
        <div
            className="btn rounded-full w-full mb-3 border border-gray-500 bg-white font-normal hover:bg-gray-100"
            onClick={onClickGoogleLogin}>
            <img src='https://user-images.githubusercontent.com/194400/70987158-4069c900-20b7-11ea-892e-8a2e1166b6b7.png'
                className='size-6 mr-2' />
            <span>Sign in with Google</span>
        </div>
    )
}
