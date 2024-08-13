import React from 'react'

export default function Loading({ loading, isOverlay }) {
    let content

    if (loading & isOverlay) {
        content = (
            <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50 ">
                <div className="flex items-center">
                    <span className="loading loading-spinner loading-lg text-gray-600"></span>
                </div>
            </div>
        )
    }
    else if (loading & !isOverlay) {
        content = (<div className="fixed inset-0 flex z-50 cursor-not-allowed"></div>)
    }
    return content
}
