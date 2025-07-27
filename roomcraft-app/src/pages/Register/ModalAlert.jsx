import { FaExclamationTriangle } from "react-icons/fa";
export const ModalAlert = ({ message, onClose }) => {
    return (
        <div className="modal-backdrop" onClick={onClose}>
            <div className="modal-box" onClick={(e) => e.stopPropagation()}>
                <FaExclamationTriangle className="modal-icon" />
                <h3 className="modal-title">Warning</h3>
                <p className="modal-message">{message}</p>
                <button onClick={onClose}>Got it!</button>
            </div>
        </div>
    );
};