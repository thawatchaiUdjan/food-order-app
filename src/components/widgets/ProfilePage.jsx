import { WalletIcon, PencilSquareIcon, MapPinIcon, ChevronDownIcon, PlusIcon, ArrowUpIcon, BanknotesIcon } from '@heroicons/react/24/solid'
import React, { useContext, useEffect, useRef, useState } from 'react'
import MapLocationModalContext, { MapLocationModalProvider } from '../contexts/MapLocationContext'
import AuthContext from '../contexts/AuthContext'
import TopUpContext from '../contexts/TopUpContext'
import AlertMessageContext from '../contexts/AlertMessageContext'
import ButtonIconOutline from './ButtonIconOutline'
import ConfirmModalContext from '../contexts/ConfirmModalContext'
import { useNavigate } from 'react-router-dom'
import { getFormatBalance } from '../../utils'

export default function ProfilePage() {
    const { user, updateUser, deleteUser } = useContext(AuthContext)
    const { showTopUp } = useContext(TopUpContext)
    const { showAlert } = useContext(AlertMessageContext)
    const { open } = useContext(ConfirmModalContext)
    const [isLoading, setIsLoading] = useState()
    const navigate = useNavigate()

    async function onSaveName(name) {
        try {
            await updateUser({ name: name })
            showAlert('success', 'Your name successfully updated')
        } catch (err) {
            showAlert('error', err.response.data.message)
        }
    }

    function onClickDeleteAccountButton() {
        open({
            title: 'Confirm Delete Account',
            detail: 'Are you sure you want to delete account?',
            onConfirm: async () => {
                try {
                    setIsLoading(true)
                    await deleteUser()
                    showAlert('success', 'Account successfully deleted')
                    navigate('/login')
                } catch (err) {
                    showAlert('error', err.response.data.message)
                } finally {
                    setIsLoading(false)
                }
            },
        })
    }

    return (
        <div className="flex justify-center mx-auto px-8 md:px-0 md:w-2/3 mt-10 mb-20 pt-20">
            <div className="flex flex-col w-full items-center">
                <div className="text-3xl text-primary uppercase mb-6">Profile</div>

                {/* avatar */}
                <div className="avatar mb-6">
                    <div className="size-44 rounded-full ring ring-primary">
                        <img
                            src="https://avatar.iran.liara.run/public/job/police/female"
                            alt="Profile"
                        />
                    </div>
                </div>

                {/* name */}
                <InputFieldAndEditButton onSave={onSaveName} defaultValue={user.user.name} />

                {/* wallet */}
                <div className='flex flex-col w-full gap-2 text-lg mt-5 text-white rounded-xl bg-success px-6 py-3 shadow-xl'>
                    <div className='flex items-center gap-2 text-sm text-secondary font-semibold'>
                        <WalletIcon className='size-5' />
                        <div>Balance</div>
                    </div>
                    <div className='text-3xl mb-4'>${getFormatBalance(user.user.balance)}</div>
                    <div className='flex flex-wrap gap-4 mb-2'>
                        <IconButton text={'Top Up'} icon={<PlusIcon className='size-5' />} onClick={showTopUp} />
                        <IconButton text={'Pay'} icon={<ArrowUpIcon className='size-4' />} />
                        <IconButton text={'Transfer'} icon={<BanknotesIcon className='size-4' />} />
                    </div>
                </div>

                {/* address */}
                <div className='w-full mt-8 text-lg'>
                    <div className='flex gap-2'>
                        Address
                        <MapPinIcon className='size-6 text-error' />
                    </div>
                    <hr className='mb-4 mt-2' />
                    <MapLocationModalProvider>
                        <DeliveryAddress />
                    </MapLocationModalProvider>
                </div>

                {/* button group */}
                <div className='w-full mt-5'>
                    <hr className='mb-4 mt-2' />
                    <ButtonIconOutline buttonType={'error'} text={'Delete account'} onClick={onClickDeleteAccountButton} />
                </div>

            </div>
        </div>
    )
}

function IconButton({ text, icon, onClick }) {
    return (
        <button className='btn rounded-full py-1 px-4 gap-1 btn-sm bg-green-700 hover:bg-green-900  text-white border-0'
            onClick={onClick}>
            {icon}
            <div>{text}</div>
        </button >
    )
}

function InputFieldAndEditButton({ defaultValue, onSave }) {
    const [editing, setEditing] = useState(false)
    const [value, setValue] = useState(defaultValue)
    const inputRef = useRef(null)

    function onClickEdit() {
        setEditing(true)
    }

    function onBlurSave() {
        setEditing(false)
        if (defaultValue !== value) {
            onSave(value)
        }
    }

    function onChangeInput(e) {
        setValue(e.target.value)
    }

    useEffect(() => {
        if (editing && inputRef.current) {
            inputRef.current.focus()
        }
    }, [editing])

    return (
        <div className="flex justify-center w-full">
            {editing ? (
                <div className="flex gap-3">
                    <input
                        className="input input-bordered text-center text-xl w-full"
                        type="text"
                        ref={inputRef}
                        value={value}
                        onChange={onChangeInput}
                        onBlur={onBlurSave}
                    />
                </div>
            ) : (
                <div className="flex  items-center gap-3 ml-8">
                    <span className="text-2xl">{value}</span>
                    <PencilSquareIcon
                        className="size-6 text-primary cursor-pointer"
                        onClick={onClickEdit}
                    />
                </div>
            )}
        </div>
    )
}

function DeliveryAddress() {
    const { openMapLocation } = useContext(MapLocationModalContext)
    const { user, updateUser } = useContext(AuthContext)
    const [location, setLocation] = useState(user.user.location)

    function onSelectLocation(location) {
        updateUser({ location: location })
    }

    useEffect(() => {
        setLocation(user.user.location)
    }, [user])

    return (
        <div
            className='w-full h-auto p-3 btn btn-outline btn-primary font-normal flex flex-row items-center justify-start'
            onClick={() => openMapLocation(location, onSelectLocation)}>
            <div className='flex-1'>{location ? location.address : 'Choose your location'}</div>
            <div><ChevronDownIcon className='size-6' /></div>
        </div>
    )
}
