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
                        className="btn uppercase w-1/5 bg-base-100 border-neutral text-neutral hover:text-neutral-600 hover:bg-base-100 hover:border-neutral-600"
                        onClick={close}>
                        Cancel
                    </button>
                    <button
                        className="btn btn-primary uppercase w-1/5"
                        onClick={() => onClickConfirmButton()}>
                        Yes
                    </button>
                </div>
            </div>
        </dialog>
    )
}