import React from 'react'

export default function Pagination({ currentPage, totalPages, onClick }) {
    return (
        <div className='flex justify-center items-center mt-14 mb-24'>
            <button className='btn btn-primary w-28'
                onClick={() => onClick(currentPage - 1)}
                disabled={currentPage == 1}>
                Previous
            </button>
            <span className='text-nowrap font-semibold text-sm text-gray-400 px-6 py-2'>{currentPage} / {totalPages}</span>
            <button className='btn btn-primary w-28'
                onClick={() => onClick(currentPage + 1)}
                disabled={currentPage == totalPages}>
                Next
            </button>
        </div>
    )
}