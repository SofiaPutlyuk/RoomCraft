import KitchenImage from "../../assets/images/kitchen.jpg";
import OfficeImage from "../../assets/images/office.jpg";
import BedroomImage from "../../assets/images/bedroom.jpg";
import LivingRoom from "../../assets/images/living-room.jpg";
import { useState } from "react";
import { ModalSoon } from "../../pages/Rooms/ModalSoon/ModalSoon";
export const CardsRoom = () => {
    const [showModal, setShowModal] = useState(false);
      const rooms = [
    { name: "Dreamy Bedroom", img: BedroomImage ,  type: "modal"},
    { name: "Cozy Living Room", img: LivingRoom , link: "/living"},
    { name: "Charming Kitchen", img: KitchenImage , link: "/kitchen" },
    { name: "Pastel Office", img: OfficeImage , link:"/study"},
  ];

  return (
    <>
    <section className="room-cards-section" id="choose-your-room">
      <h2>Choose Your Room</h2>
      <div className="room-grid">
        {rooms.map((room, index) =>
          room.type === "modal" ? (
            <div
              key={index}
              className="room-card"
              onClick={() => setShowModal(true)}
              style={{ cursor: "pointer" }}
            >
              <img src={room.img} alt={room.name} />
              <h3>{room.name}</h3>
            </div>
          ) : (
            <a href={room.link} className="room-card" key={index}>
              <img src={room.img} alt={room.name} />
              <h3>{room.name}</h3>
            </a>
          )
        )}
      </div>
    </section>
       {showModal && <ModalSoon closeModal={() => setShowModal(false)} />}
    </>
  );
};