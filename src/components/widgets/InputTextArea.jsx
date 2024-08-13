import React from 'react'

export default function InputTextArea({ id, label, placeholder, rows = 3, register, name, rules, error }) {
    return (
        <div>
            <label htmlFor={id} className='text-lg'>{label}</label>
            <div className='mt-2'>
                <textarea
                    id={id}
                    rows={rows}
                    className={`textarea textarea-bordered w-full resize-none ${error ? 'border-error' : ''}`}
                    placeholder={placeholder}
                    {...register(name, rules)}
                />
            </div>
            {error && <p className="text-error text-xs mt-2">{error.message}</p>}
        </div>
    )
}
