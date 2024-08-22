import React from 'react'

export default function ConfirmModal({ detail, isShow, close }) {
    function onClickConfirmButton() {
        detail?.onConfirm()
        close()
    }

    return (
        <dialog id="confirm-modal" className={`${isShow ? 'modal-open' : 'modal-closed'} modal z-40`}>
            <div className="modal-box">
                <h3 className="font-bold text-lg">{detail?.title}</h3>
                <p className="py-4">{detail?.detail}</p>
                <div className="modal-action">
                    <button
                        className="btn uppercase w-24 bg-base-100 border-gray-400 text-gray-400 hover:text-neutral-600 hover:bg-base-100 hover:border-neutral-600"
                        onClick={close}>
                        Cancel
                    </button>
                    <button
                        className="btn btn-primary uppercase w-24"
                        onClick={() => onClickConfirmButton()}>
                        Yes
                    </button>
                </div>
            </div>
        </dialog>
    )
}