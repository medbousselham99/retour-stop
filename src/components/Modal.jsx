import { CheckCircle } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function Modal() {
  const { modal, closeModal } = useApp();
  if (!modal) return null;

  return (
    <div
      className="modal-overlay"
      onClick={(e) => e.target === e.currentTarget && closeModal()}
    >
      <div className="modal">
        <CheckCircle size={48} style={{ color: 'var(--teal)' }} />
        <h3>{modal.title}</h3>
        <p>{modal.text}</p>
        <button type="button" className="btn btn-primary" onClick={closeModal}>
          OK
        </button>
      </div>
    </div>
  );
}
