import React from 'react'

export default function InputTextLabel({ id, label, placeholder, type = 'text', register, name, rules, error}) {
    return (
        <div className='flex-1'>
            <label htmlFor={id} className='text-lg'>{label}</label>
            <div className='mt-2'>
                <input
                    id={id}
                    type={type}
                    className={`input input-bordered w-full ${error ? 'border-error' : ''}`}
                    placeholder={placeholder}                    
                    {...register(name, rules)}
                />
            </div>
            {error && <p className="text-error text-xs mt-2">{error.message}</p>}
        </div>
    )
}
