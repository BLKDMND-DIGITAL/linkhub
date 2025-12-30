import React from 'react';

interface QRCodeModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: string;
}

const QRCodeModal: React.FC<QRCodeModalProps> = ({ isOpen, onClose, data }) => {
  if (!isOpen) {
    return null;
  }

  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=256x256&data=${encodeURIComponent(data)}`;

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 transition-opacity"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="qr-modal-title"
    >
      <div 
        className="bg-background p-6 rounded-lg shadow-xl relative w-full max-w-xs text-center border border-accent"
        onClick={(e) => e.stopPropagation()}
      >
        <button 
          onClick={onClose}
          className="absolute top-2 right-2 text-content/50 hover:text-content"
          aria-label="Close modal"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <h3 id="qr-modal-title" className="text-lg font-bold font-heading mb-4">Scan to Email</h3>
        <div className="p-2 bg-white rounded-md">
            <img src={qrCodeUrl} alt="Email QR Code" className="w-full h-full" />
        </div>
        <p className="text-sm text-content/70 mt-4">
          Open your camera app and point it at the QR code to open a new email.
        </p>
      </div>
    </div>
  );
};

export default QRCodeModal;
