import React from 'react'
import { Link } from 'react-router-dom'

export default function NotFound() {
    return (
        <div className="flex items-center justify-center h-screen bg-white">
            <div className="text-center p-6">
                <h1 className="text-9xl font-bold text-gray-800 mb-4">404</h1>
                <p className="text-lg text-gray-600 mb-6">Oops! The page you are looking for does not exist.</p>
                <Link to={'/'}>
                    <button
                        className="btn btn-primary px-6 py-3 text-white font-semibold rounded-lg shadow-md hover:bg-primary-focus transition ease-in-out duration-150">
                        Go to Home
                    </button>
                </Link>
            </div>
        </div>
    )
}