import React, { useContext, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import ButtonIcon from '../widgets/ButtonIcon'
import InputText from '../widgets/InputText'
import AuthContext from '../contexts/AuthContext'

export default function Login() {
    const { login, register } = useContext(AuthContext)
    const [isRegister, setIsRegister] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const registerForm = useForm()
    const loginForm = useForm()
    const navigate = useNavigate()

    async function onLoginSubmit(data) {
        clearErrorMessage()
        userLogin(data)
    }

    async function onRegisterSubmit(data) {
        clearErrorMessage()
        userRegister(data)
    }

    async function userLogin(data) {
        try {
            setIsLoading(true)
            await login(data)
            navigate('/')
        } catch (err) {
            setErrorMessage(err.response.data.message)
        } finally {
            setIsLoading(false)
        }
    }

    async function userRegister(data) {
        try {
            setIsLoading(true)
            await register(data)
            navigate('/')
        } catch (err) {
            setErrorMessage(err.response.data.message)
        } finally {
            setIsLoading(false)
        }
    }

    function onClickChangeForm(form, isRegister) {
        form.reset()
        clearErrorMessage()
        setIsRegister(isRegister)
    }

    function clearErrorMessage() {
        setErrorMessage('')
    }

    const loginPage = (
        <form onSubmit={loginForm.handleSubmit(onLoginSubmit)}>
            <InputText
                id={'login-username-input'}
                placeholder={'Username'}
                register={loginForm.register}
                rules={{ required: 'Username is required' }}
                name={'username'}
                error={loginForm.formState.errors.username}>
            </InputText>
            <InputText
                id={'login-password-input'}
                placeholder={'Password'}
                type='password'
                register={loginForm.register}
                rules={{ required: 'Password is required' }}
                name={'password'}
                error={loginForm.formState.errors.password}>
            </InputText>
            {errorMessage && <p className='text-red-500 mt-3'>{errorMessage}</p>}
            <div className='my-4 flex items-center'>
                <input type='checkbox' id='remember' name='remember' className='text-blue-500' />
                <label htmlFor='remember' className='text-gray-600 ml-2'>Remember Me</label>
            </div>
            <div className='mb-6 h-5'>
                <button className='border-primary text-primary hover:border-b'>Forgot Password?</button>
            </div>
            <ButtonIcon type={'submit'} text={'Login'} isLoading={isLoading} />
        </form>
    )

    const registerPage = (
        <form onSubmit={registerForm.handleSubmit(onRegisterSubmit)}>
            <p className='text-primary'>Personal Information</p>
            <InputText
                id={'first-name-input'}
                placeholder={'First name'}
                register={registerForm.register}
                rules={{ required: 'First name is required' }}
                name={'first_name'}
                error={registerForm.formState.errors.first_name}>
            </InputText>
            <InputText
                id={'last-name-input'}
                placeholder={'Last name'}
                register={registerForm.register}
                rules={{ required: 'Last name is required' }}
                name={'last_name'}
                error={registerForm.formState.errors.last_name}>
            </InputText>
            <p className='text-primary mt-5'>User Information</p>
            <InputText
                id={'register-username-input'}
                placeholder={'Username'}
                register={registerForm.register}
                rules={{ required: 'Username is required' }}
                name={'username'}
                error={registerForm.formState.errors.username}>
            </InputText>
            <InputText
                id={'register-password-input'}
                placeholder={'Password'}
                type='password'
                register={registerForm.register}
                rules={{ required: 'Password is required' }}
                name={'password'}
                error={registerForm.formState.errors.password}>
            </InputText>
            {errorMessage && <p className='text-red-500 mt-3'>{errorMessage}</p>}
            <div className='my-5'></div>
            <ButtonIcon type={'submit'} text={'Register'} isLoading={isLoading} />
        </form>
    )

    return (
        <div className='bg-secondary flex justify-center items-center h-screen'>
            <div className='w-1/2 h-screen hidden lg:block'>
                <img src='https://images.pexels.com/photos/1832016/pexels-photo-1832016.jpeg?auto=compress&cs=tinysrgb' alt='Placeholder Image' className='object-cover w-full h-full' />
            </div>
            <div className='lg:p-36 md:p-52 sm:20 p-8 w-full lg:w-1/2'>
                <h1 className='text-2xl font-semibold mb-4 text-primary'>{isRegister ? 'Register' : 'Login'}</h1>
                {isRegister ? registerPage : loginPage}
                <div className='mt-6 h-1 text-center'>
                    {isRegister ? (
                        <button className='text-primary border-primary hover:border-b' onClick={() => onClickChangeForm(registerForm, false)}>Login here</button>
                    ) : (
                        <button className='text-primary border-primary hover:border-b' onClick={() => onClickChangeForm(loginForm, true)}>Sign up here</button>
                    )}
                </div>
            </div>
        </div>
    )    
}
