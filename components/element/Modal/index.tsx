import React from "react";
import Button from "../Button";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  header: string;
  description: string;
  onConfirm: () => void;
  confirmTitle: string;
  bgDelete: boolean | null;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, header, description, onConfirm, confirmTitle, bgDelete }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content divide-y divide-gray-300" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{header}</h2>
          <button className="modal-close-btn" onClick={onClose}>X</button>
        </div>
        <div className="modal-body">
          <p dangerouslySetInnerHTML={{ __html: description }} />
        </div>
        <div className="modal-footer">
          <button className="btn-modal border border-solid border-1 border-[#00371D]" onClick={onClose}>No, Decline</button>
          <Button title={confirmTitle} onConfirm={onConfirm} bgDelete={bgDelete} />
        </div>
      </div>
    </div>
  );
};

export default Modal;
