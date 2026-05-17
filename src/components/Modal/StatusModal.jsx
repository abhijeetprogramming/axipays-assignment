import "./StatusModal.css";

function StatusModal({ isOpen, status, message, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="status-modal">
        <div className="status-icon">
          {status === "success" ? "✅" : status === "pending" ? "⏳" : "❌"}
        </div>

        <h2>
          {status === "success"
            ? "Payment Successful"
            : status === "pending"
              ? "Payment Pending"
              : "Payment Failed"}
        </h2>

        <p>{message}</p>

        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
}

export default StatusModal;
