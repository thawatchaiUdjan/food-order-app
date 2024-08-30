import { ArrowUpCircleIcon } from '@heroicons/react/24/solid'
import React, { useContext, useState } from 'react'
import { useForm } from 'react-hook-form'
import ButtonIcon from '../widgets/ButtonIcon'
import { getFormatBalance } from '../../utils'
import AuthContext from '../contexts/AuthContext'
import Swal from 'sweetalert2'

export default function TopUpModal({ close }) {
    const topUps = [20, 50, 100, 150, 200, 300, 400, 500, 1000, 1500, 2000]
    const { register, handleSubmit, setValue, trigger, watch, formState: { errors } } = useForm({ mode: 'onChange' })
    const [topUpSelect, setTopUpSelect] = useState(0)
    const [isLoading, setIsLoading] = useState(false)
    const { user, updateUser } = useContext(AuthContext)
    const topUpValue = watch('balance')

    async function onSubmit(data) {
        try {
            setIsLoading(true)
            await updateUser({ balance: user.user.balance + data.balance })
            Swal.fire({
                title: `$${data.balance}`,
                text: "Awesome! Your top-up was successful",
                icon: "success"
            })
            close()
        } catch (err) {
            Swal.fire({
                text: "Oops! Something went wrong with your top-up. Please try again",
                icon: "error"
            })
        } finally {
            setIsLoading(false)
        }
    }

    function onClickTopUpSelectButton(value) {
        setTopUpSelect(value)
        setValue('balance', value ? `$${getFormatBalance(value, false)}` : '')
        trigger('balance')
    }

    function onChangeTopUpInput(e) {
        const value = getFormatBalance(e.target.value, false)
        setTopUpSelect(0)
        setValue('balance', value ? `$${value}` : '')
    }

    return (
        <dialog id="top-up-modal" className=' modal modal-open z-40'>
            <div className="modal-box">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <button onClick={close} className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    <div className="text-2xl text-center mb-5 uppercase text-primary">Top Up</div>

                    {/* top-up input */}
                    <div className='flex flex-col justify-center gap-2 px-10 sm:px-24'>
                        <input
                            className={`text-3xl text-center border-b-2 py-2 focus:outline-none transition duration-150 ease-in-out ${errors.balance ? 'text-error focus:border-error' : 'text-primary focus:border-primary'}`}
                            id='top-up-input'
                            step='0.01'
                            placeholder={'$0.00'}
                            autoComplete='false'
                            autoFocus={true}
                            {...register('balance', {
                                required: 'please enter balance',
                                min: { value: 1, message: 'please enter balance' },
                                max: { value: 10000, message: 'balance must be less than $10,000' },
                                onChange: onChangeTopUpInput,
                                setValueAs: (value) => { return parseInt(value.replace(/[$,]/g, '')) }
                            })}
                        />
                        <div className='flex justify-center text-error'>{errors.balance ? errors.balance.message : ''}</div>
                    </div>

                    {/* top-up select button group */}
                    <div className='flex justify-center'>
                        <div className='grid grid-cols-2 sm:grid-cols-3 gap-5 mt-5 w-full'>
                            {
                                topUps.map((topUp, index) => (
                                    <TopUpSelectButton
                                        key={index}
                                        value={topUp}
                                        topUpValue={getFormatBalance(topUp, false)}
                                        topUpSelect={topUpSelect}
                                        onClick={onClickTopUpSelectButton}
                                    />
                                ))
                            }
                        </div>
                    </div>

                    <div>
                        <hr className='mt-6 mb-5' />
                        <div className='flex justify-between items-baseline text-lg'>
                            <div>Subtotal</div>
                            <div className='text-primary text-xl'>${topUpValue ? getFormatBalance(topUpValue) : 0}</div>
                        </div>
                    </div>

                    {/* confirm top-up button */}
                    <div className="modal-action justify-center">
                        <ButtonIcon
                            icon={<ArrowUpCircleIcon className='size-6' />}
                            text={'confirm'}
                            onClick={() => { }}
                            isLoading={isLoading}
                            disabled={errors.balance || !topUpValue}
                        />
                    </div>
                </form>
            </div>
        </dialog>
    )
}

function TopUpSelectButton({ value, topUpValue, topUpSelect, onClick }) {
    return (
        <div className={`cursor-pointer border-2 py-3 text-lg text-center rounded-lg ${topUpSelect == value ? 'border-primary text-primary bg-primary bg-opacity-10' : 'border-secondary'}`}
            onClick={() => onClick(value)}>
            ${topUpValue}
        </div>
    )
}
