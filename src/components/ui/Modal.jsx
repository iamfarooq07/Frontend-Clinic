import React from 'react';

export const Modal = ({ isOpen, onClose, title, children, size = 'md' }) => {
  if (!isOpen) return null;

  const sizes = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl',
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex justify-center items-center z-50 p-5">
      <div className={`bg-dark-card rounded-lg w-full ${sizes[size]} max-h-[90vh] overflow-auto border border-dark-border`}>
        <div className="p-8">
          <h3 className="text-xl font-semibold mb-5 text-slate-50">{title}</h3>
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
