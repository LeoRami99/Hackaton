import React, { useState } from 'react';

import Cards from '../components/cards';
import Modal from '../components/modal';
import Banner from '..components/banner';

type ModalProps = {
    cardInfo: Array<string>; // Specify the type of elements in the array
};

const Modal: React.FC<ModalProps> = ({ cardInfo }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleModal = () => {
        setIsOpen(!isOpen);
    };

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
};

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