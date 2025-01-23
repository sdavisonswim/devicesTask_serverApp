import React from 'react';
import '../styles/DeleteConfirmationModal.css';

const DeleteConfirmationModal = ({ isOpen, closeModal, device, onConfirm }) => {
    return (
        <div className={`delete-modal ${isOpen ? 'delete-modal-open' : 'delete-modal-close'}`}>
            <div className="delete-modal-content">
                <div>Delete device?</div>
                <p>You are about to delete the device <strong>{device.system_name + '-' + device.id}</strong>. This action cannot be undone.</p>
                <div className="delete-modal-actions">
                    <button className="cancel-button" onClick={closeModal}>Cancel</button>
                    <button className="delete-button" onClick={onConfirm}>Delete</button>
                </div>
            </div>
        </div>
    );
};

export default DeleteConfirmationModal;
