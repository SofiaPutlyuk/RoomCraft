import { useState } from "react";
export const ModalSoon = () => {
  const [showModal, setShowModal] = useState(false);

  const handleClick = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <div className="room-card" onClick={handleClick}>
        <h3>Room</h3>
        <p>Click to view</p>
      </div>

      {showModal && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>🚧 Coming Soon</h2>
            <p>This room is still under construction. The developer is already working on it 💻</p>
            <p style={{ fontStyle: "italic", marginTop: "10px" }}>Sorry for the inconvenience 🙏</p>
            <button onClick={closeModal}>Close</button>
          </div>
        </div>
      )}
    </>
  );
};