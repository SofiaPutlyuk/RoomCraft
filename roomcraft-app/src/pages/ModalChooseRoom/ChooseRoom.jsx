import { useState } from "react";

export const ChooseRoom = () => {
  const [selectedRoom, setSelectedRoom] = useState(null);
  const rooms = ["Living Room", "Kitchen", "Bedroom", "Bathroom"];

  const handleSelect = (room) => {
    setSelectedRoom(room);
  };

  const handleContinue = () => {
    if (selectedRoom) {
      alert(`You selected: ${selectedRoom}`);
    }
  };

  return (
    <div className="choose-room-container">
      <h2>Choose the room you want to build first</h2>
      <ul className="room-list">
        {rooms.map((room) => (
          <li
            key={room}
            className={`room-item ${selectedRoom === room ? "selected" : ""}`}
            onClick={() => handleSelect(room)}
          >
            {room}
          </li>
        ))}
      </ul>
      <button onClick={handleContinue} disabled={!selectedRoom}>
        Continue
      </button>
    </div>
  );
};