import { X } from "lucide-react";
import { useEffect, useState } from "react";

const Modal = ({ open, onClose, title="", children }) => {
    const [visible, setVisible] = useState(false);

    // Handle fade-in and fade-out for smooth transition
    useEffect(() => {
        if (open) setVisible(true);
        else {
            // Delay removal to allow fade-out
            const timeout = setTimeout(() => setVisible(false), 300);
            return () => clearTimeout(timeout);
        }
    }, [open]);

    if (!visible) return null;

    return (
        <div
            onClick={onClose}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
            className={`fixed inset-0 flex items-center justify-center z-50
        bg-white/30 backdrop-blur-sm
        transition-opacity duration-300
        ${open ? 'opacity-100' : 'opacity-0'}
      `}
        >
            <div
                onClick={(e) => e.stopPropagation()}
                className="bg-base-100 rounded-lg max-w-md w-full p-6 relative shadow-lg"
            >
                <button
                    onClick={onClose}
                    aria-label="Close modal"
                    className="absolute top-3 right-3 text-gray-600 hover:text-gray-900"
                >
                    <X size={24} />
                </button>
                {title && (
                    <h3 id="modal-title" className="text-xl font-semibold mb-4">
                        {title}
                    </h3>
                )}
                <div>{children}</div>
            </div>
        </div>
    );
};
export default Modal;