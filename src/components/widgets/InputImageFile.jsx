import React, { forwardRef } from 'react'

const InputImageFile = forwardRef(({ image, onChange }, ref) => {
    return (
        <div>
            <div className="flex flex-col items-center justify-center">
                <div className='relative w-68 h-60 mb-4'>
                    <img
                        src={image ? image : 'https://www.achivr.in/cdn/shop/products/no-image-available-grid_5ad88fe4-3f32-4194-b9df-8fda72817a72.jpg?v=1554983465'}
                        alt={image || ''}
                        className="object-cover w-full h-full border border-gray-300 rounded-xl"
                    />
                </div>
                <input
                    id='food-image-input'
                    type="file"
                    accept="image/*"
                    className="file-input file-input-bordered file-input-primary file-input-sm"
                    ref={ref}
                    onChange={onChange}
                />
            </div>
        </div>
    )
})

InputImageFile.displayName = 'InputImageFile'
export default InputImageFile
