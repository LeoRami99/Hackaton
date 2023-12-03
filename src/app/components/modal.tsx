import React, { useState } from 'react';

const Modal = () => {
    function handleClickButton () {
        if (true) {
            return(
                <dialog id="my_modal_3" className="modal">
                <div className="modal-box">
                  <form method="dialog">
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                  </form>
                  <h3 className="font-bold text-lg">Offers - Apply</h3>
                  <ul>
                    <li>company Wallet: </li>
                    <li>Value:</li>
                    <li>Description</li>
                  </ul>
                  <p className="py-4">Press ESC key or click on ✕ button to close</p>
                </div>
              </dialog> 
            )
        } else {
            return console.error("Se produjo un error.");
        }
}

export default Modal;

/* const closeModal = () => {
    setModalOpen(false);
};

return (
    <div className="card bordered shadow-lg max-w-sm w-full rounded-lg overflow-hidden">
        <div className="card-body">
            <h2 className="card-title">{title}</h2>
            <p>{description}</p>
            <button className="btn btn-primary" onClick={handleClick}>Ver más</button>
        </div>
        {modalOpen && <Modal cardInfo={[]} closeModal={closeModal} />}
    </div>
);
}; */


return (
    <div>
        <button onClick={toggleModal}>Abrir Modal</button>
        {isOpen && (
            <div className="modal">
                <div className="modal-content">
                    <span className="close" onClick={toggleModal}>
                        &times;
                    </span>
                    <p>{cardInfo}</p>
                </div>
            </div>
        )}
    </div>
);


const Modal = () => {
    
}
const handleVerMasClick = () => {
    if (seleccionado) {
        // Código a ejecutar si se ha seleccionado el botón de "Ver más"
    } else {
        // Código a ejecutar si no se ha seleccionado el botón de "Ver más"
    }
};