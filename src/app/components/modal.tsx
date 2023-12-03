"use client"

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
