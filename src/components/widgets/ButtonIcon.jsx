import React from 'react'

export default function ButtonIcon({ text, name, icon, type, buttonType = 'primary', isLoading, disabled, onClick }) {
    const buttonTypes = {
        primary: 'btn-primary',
        error: 'btn-error',
    }

    return (
        <button
            className={`btn btn-circle py-2 px-4 w-full uppercase font-semibold ${buttonTypes[buttonType]} `}
            name={name}
            type={type}
            onClick={onClick}
            disabled={isLoading ? isLoading : disabled}>
            {isLoading ? (<span className="loading loading-spinner loading-sm"></span>) : (icon)}
            {text}
        </button>
    )
}
