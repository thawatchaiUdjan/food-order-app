import React, { useContext, useEffect } from 'react'
import FoodCartContext from '../contexts/FoodCartContext'
import { useForm } from 'react-hook-form'
import ButtonIcon from './ButtonIcon'
import { ShoppingCartIcon } from '@heroicons/react/24/solid'
import InputTextArea from './InputTextArea'

export default function FoodOptionModal({ food, isShow, close }) {
    const { register, handleSubmit, reset, formState: { errors } } = useForm()
    const { addFoodCart } = useContext(FoodCartContext)

    function onSubmit(data) {
        const foodOptions = {
            option_string: getStringOptions(data),
            option_note: data['option-note']
        }
        addFoodCart({ food, foodOptions })
        close()
        console.log(food)
    }

    function getStringOptions(data) {
        return Object.keys(data).reduce((acc, key) => {
            const option = data[key]
            if (key != 'option-note' && option) {
                if (Array.isArray(option)) {
                    acc.push(...option)
                } else {
                    acc.push(option)
                }
            }
            return acc
        }, [])
    }

    useEffect(() => {
        reset()
    }, [food])

    return (
        <dialog id='food-option-modal' className={`${isShow ? 'modal-open' : 'modal-closed'} modal z-10 max-w-full`}>
            <div className="modal-box max-w-2xl px-10">
                <button onClick={close} className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col'>

                    {/* food info */}
                    <div className="flex flex-col items-center justify-center">
                        <div className='relative w-68 h-60 mb-4'>
                            <img
                                src={food.food_image_url ? food.food_image_url : 'https://www.achivr.in/cdn/shop/products/no-image-available-grid_5ad88fe4-3f32-4194-b9df-8fda72817a72.jpg?v=1554983465'}
                                alt={food.food_name}
                                className="object-contain w-full h-full border border-gray-300 rounded-xl"
                            />
                        </div>
                        <div className='flex items-baseline mt-3 mb-1 self-start'>
                            <span className='text-3xl text-primary truncate mr-3'>{food.food_name}</span>
                            <span className="text-primary text-2xl text-opacity-70">{food.food_price}$</span>
                            <span className="text-sm text-gray-400 line-through ml-2">{food.food_price_discount}$</span>
                        </div>
                        <div className='text-sm self-start text-gray-400'>{food.food_description}</div>
                    </div>

                    {/* food options */}
                    {
                        food.food_options.map((option, index) => (
                            option.option_type == 'select' ?
                                <SelectOption
                                    key={index}
                                    option={option}
                                    name={`select-option-${index}`}
                                    register={register}
                                    rules={{ required: true }}
                                    errors={errors}
                                /> :
                                <CheckBoxOption
                                    key={index}
                                    option={option}
                                    name={`checkbox-option-${index}`}
                                    register={register}
                                    rules={{ required: true }}
                                    errors={errors}
                                />
                        ))
                    }

                    {/* note input */}
                    <div className='flex items-center text-lg text-primary font-semibold mt-5'>
                        <span className='mr-2'>Note</span>
                        <span className='text-xs text-black text-opacity-35'>*optional</span>
                    </div>
                    <InputTextArea name={'option-note'} register={register} placeholder={'e.g. Dont include plastic spoon'} />

                    {/* submit button */}
                    <div className="modal-action">
                        <ButtonIcon
                            type={'submit'}
                            text={'Add to cart'}
                            icon={<ShoppingCartIcon className='size-6' />}>
                        </ButtonIcon>
                    </div>

                </form>
            </div>
        </dialog>
    )

    function SelectOption({ option, name, register, rules, errors }) {
        return (
            <div>
                <div className='mb-3 mt-5'>
                    <span className='text-lg text-primary font-semibold mr-2'>{option.option_name}</span>
                    {rules.required ? <span className='text-xs text-error'>*required</span> : <span className='text-xs text-black text-opacity-35'>*optional</span>}
                </div>
                {
                    option.option_choices.map((choice, index) => (
                        <div key={index} className='flex gap-3 mb-3'>
                            <input
                                type='radio'
                                className={`radio ${errors[name] ? 'radio-error' : 'radio-primary'} `}
                                value={choice.choice_name}
                                {...register(name, rules)}
                            />
                            <span className={`${errors[name] ? 'text-error' : ''}`}>{choice.choice_name}</span>
                        </div>
                    ))
                }
            </div>
        )
    }

    function CheckBoxOption({ option, name, register, rules, errors }) {
        return (
            <div>
                <div className='mb-3 mt-5'>
                    <span className='text-lg text-primary font-semibold mr-2'>{option.option_name}</span>
                    {rules.required ? <span className='text-xs text-error'>*required</span> : <span className='text-xs text-black text-opacity-35'>*optional</span>}
                </div>
                {
                    option.option_choices.map((choice, index) => (
                        <div key={index} className='flex gap-3 mb-3'>
                            <input
                                className={`checkbox ${errors[name] ? 'checkbox-error' : 'checkbox-primary'} `}
                                type='checkbox'
                                value={choice.choice_name}
                                {...register(name, rules)}
                            />
                            <span className={`${errors[name] ? 'text-error' : ''}`}>{choice.choice_name}</span>
                        </div>
                    ))
                }
            </div>
        )
    }
}
