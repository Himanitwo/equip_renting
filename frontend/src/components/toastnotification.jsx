import React from 'react';

export default function ToastNotification({ toast, onClose }) {
  if (!toast.visible) return null;

  return (
    <div className="toast-container position-fixed bottom-0 end-0 p-3 z-3">
      <div className="toast show align-items-center text-white bg-brand-dark border border-brand-orange" role="alert">
        <div className="d-flex">
          <div className="toast-body d-flex align-items-center gap-2">
            <i className="fa-solid fa-circle-check text-brand-orange fs-5"></i>
            <div>
              <strong className="d-block text-white">{toast.title}</strong>
              <span className="text-white-50" style={{ fontSize: '0.8rem' }}>{toast.message}</span>
            </div>
          </div>
          <button type="button" onClick={onClose} className="btn-close btn-close-white me-2 m-auto" aria-label="Close"></button>
        </div>
      </div>
    </div>
  );
}