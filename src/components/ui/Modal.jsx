import { useEffect } from 'react';

export default function ConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  message,
}) {
  useEffect(() => {
    if (!isOpen) return; // Ne fait rien tant que la modal est fermée

    const handleKeyDown = e => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    document.addEventListener('keydown', handleKeyDown);

    // Supprime l'écouteur quand le modal se ferme
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null; // Ne rend rien si la modal est fermée

  return (
    <dialog
      open
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs m-0 border-0 p-0 h-full w-full max-w-none max-h-none text-brown"
    >
      <div className="bg-white rounded-(--radius-card) p-6 max-w-sm w-full">
        <h1 className="font-semibold mb-2">Confirmation</h1>
        <p className="text-base mb-6 ">{message}</p>

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="bg-lin px-3 py-2 text-base font-medium rounded-(--radius-button) hover:bg-brown hover:text-lin transition duration-150 ease-in-out"
          >
            Annuler
          </button>
          <button
            onClick={onConfirm}
            className="bg-terracotta px-3 py-2 text-base font-medium rounded-(--radius-button) hover:bg-brown hover:text-lin transition duration-150 ease-in-out"
          >
            Confirmer
          </button>
        </div>
      </div>
    </dialog>
  );
}
