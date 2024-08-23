import React from 'react'

export default function InputSelect({ data, valueField, textField, id, label, defaultText, register, name, rules, error }) {
    return (
        <div>
            <label htmlFor={id} className='text-lg'>{label}</label>
            <select id={id}
                className={`select select-bordered w-full my-2 ${error ? 'select-error' : ''}`}
                {...register(name, rules)}>
                <option disabled value=''>{defaultText}</option>
                {
                    data.map((item, index) => {
                        return index > 0 && (
                            <option key={index} value={item[valueField]}>{item[textField]}</option>
                        )
                    })
                }
            </select>
            {error && <p className="text-error text-xs mt-2">{error.message}</p>}
        </div>
    )
}
