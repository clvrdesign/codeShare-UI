import { useState, useEffect } from "react";
import PropTypes from 'prop-types';

const Modal = ({ children, onClose }) => {
    const [isOpen, setIsOpen] = useState(true);

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') {
                setIsOpen(false);
                if (onClose) {
                    onClose(); // Notify parent about closing if onClose is provided
                }
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [onClose]);

    const handleCloseClick = (e) => {
        e.stopPropagation();
        setIsOpen(prev=>!prev);
        if (onClose) {
            onClose(); // Notify parent about closing if onClose is provided
        }
    };

    if (!isOpen) return null;

    return (
        <div
            className="w-full h-screen flex items-center justify-center fixed top-0 left-0 bg-black bg-opacity-50 z-50"
            aria-modal="true"
            role="dialog"
        >
            <div className="bg-gray-950 rounded-2xl relative">
                <button
                    onClick={handleCloseClick}
                    className="absolute top-3 right-3 text-gray-400 hover:text-gray-100"
                >
                   <i className="fi fi-rr-x absolute -top-10 w-8 h-8 text-sm flex items-center justify-center text-gray-50 bg-black bg-opacity-40 rounded-full"></i>
                </button>
                <div className="max-w-[750px] m-auto  p-4 text-gray-100">
                    {children}
                </div>
            </div>
        </div>
    );
};

Modal.propTypes = {
    children: PropTypes.node.isRequired,
    onClose: PropTypes.func, // Optional onClose prop
};

export default Modal;
