import React, { useContext } from 'react'
import FacebookIcon from '../../assets/facebook-icon.png'
import ReactFacebookLogin from 'react-facebook-login'
import { useNavigate } from 'react-router-dom'
import LoadingContext from '../contexts/LoadingContext'
import AuthContext from '../contexts/AuthContext'

export default function FacebookLoginButton() {
    const { showLoading, hideLoading } = useContext(LoadingContext)
    const { facebookLogin } = useContext(AuthContext)
    const navigate = useNavigate()

    async function onSignInSuccess(response) {
        try {
            await facebookLogin({ access_token: response.accessToken })
            navigate('/')
        } catch (err) {
            console.log('Facebook Sign-In Error', err.message)
        } finally {
            hideLoading()
        }
    }

    function onSignInError(err) {
        console.log('Facebook Sign-In Error:', err)
        hideLoading()
    }

    function onClickFacebookLogin() {
        showLoading(false)
    }

    return (
        <ReactFacebookLogin
            appId={import.meta.env.VITE_FACEBOOK_APP_ID}
            callback={onSignInSuccess}
            onClick={onClickFacebookLogin}
            onFailure={onSignInError}
            icon={<img src={FacebookIcon} className='size-6 mr-2' />}
            textButton='Sign in with Facebook'
            cssClass={'btn rounded-full w-full bg-[#1877F2] font-normal text-white hover:bg-[#135fc1]'}
        />
    )
}
