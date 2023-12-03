import React from "react";

const Modal = ({ indexModal, openModal, closeModal, cardInfo }: any) => {
    // showModal
    // closeModal
    openModal = () => {
        const modalIndice: any = document.getElementById(`my_modal${indexModal}`);
        modalIndice.showModal();
    };
    return (
        <dialog id={`my_modal${indexModal}`} className="modal">
            <div className="modal-box">
                <form method="dialog">
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={closeModal}>
                        ✕
                    </button>
                </form>
                <h3 className="font-bold text-lg">Offers - Apply</h3>
                <ul>
                    <li>Company Wallet: </li>
                    <li>Value: </li>
                    <li>Description: </li>
                </ul>
                <p className="py-4">Press ESC key or click on ✕ button to close</p>
            </div>
        </dialog>
    );
};

export default Modal;
