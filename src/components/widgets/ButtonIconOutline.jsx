import React from 'react'

export default function ButtonIconOutline({ text, name, icon, type, buttonType, isLoading, onClick }) {
    const buttonTypes = {
        primary: 'btn-primary',
        error: 'btn-error',
    }

    return (
        <button
            className={`btn btn-outline uppercase ${buttonTypes[buttonType]}`}
            name={name}
            type={type}
            onClick={onClick}
            disabled={isLoading}>
            {isLoading ? (<span className="loading loading-spinner loading-sm"></span>) : (icon)}
            {text}
        </button>
    )
}
