import React from 'react'

export default function InputWithTails({ id, label, placeholder, startTail, endTail, type, register, name, rules, error}) {
    return (
        <div className='flex-1'>
            <label htmlFor={id} className='text-lg'>{label}</label>
            <div className={`flex items-center input input-bordered mt-2 ${error ? 'border-error' : ''}`}>
                <span className="flex-none text-gray-600">{startTail}</span>
                <input
                    id={id}
                    type={type}
                    step='0.01'
                    className='grow px-2'
                    placeholder={placeholder}
                    {...register(name, rules)}
                />
                <span className="flex-none text-gray-500">{endTail}</span>
            </div>
            {error && <p className="text-error text-xs mt-2">{error.message}</p>}
        </div>
    )
}
