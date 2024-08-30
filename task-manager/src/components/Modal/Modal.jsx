import PropTypes from 'prop-types';
import { useState } from 'react';

const Modal = ({ children, btnClassName="" }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleModal = () => {
        setIsOpen(!isOpen);
    };

    const label = children.find(child => child.type === Modal.Label);
    const body = children.find(child => child.type === Modal.Body);

    return (
        <>
            <button
                onClick={toggleModal}
                className={`transition duration-300 ${btnClassName}`}
            >
                {label}
            </button>

            {isOpen && (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    {/* Overlay */}
                    <div
                        className="fixed inset-0 bg-black opacity-50"
                        onClick={toggleModal}
                    ></div>

                    {/* Modal Content */}
                    <div className="bg-white rounded-lg shadow-lg overflow-hidden w-11/12 max-w-lg mx-auto p-6 relative z-10">
                        {body}
                        <div className="flex justify-end mt-4">
                            <button
                                onClick={toggleModal}
                                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-500 transition duration-300"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

Modal.propTypes = {
    children: PropTypes.node.isRequired,
    btnClassName: PropTypes.string,
};


Modal.Label = ({ children }) => children;
Modal.Label.propTypes = {
    children: PropTypes.node.isRequired,
};

Modal.Body = ({ children }) => children;
Modal.Body.propTypes = {
    children: PropTypes.node.isRequired,
};

export default Modal;
