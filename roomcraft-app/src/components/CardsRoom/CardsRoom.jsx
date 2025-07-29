import KitchenImage from "../../assets/images/kitchen.jpg";
import OfficeImage from "../../assets/images/office.jpg";
import BedroomImage from "../../assets/images/bedroom.jpg";
import LivingRoom from "../../assets/images/living-room.jpg";
export const CardsRoom = () => {
      const rooms = [
    { name: "Dreamy Bedroom", img: BedroomImage , link: "/bedroom"},
    { name: "Cozy Living Room", img: LivingRoom , link: "/living"},
    { name: "Charming Kitchen", img: KitchenImage , link: "/kitchen" },
    { name: "Pastel Office", img: OfficeImage , link:"/study"},
  ];

return(
    <section className="room-cards-section" id="choose-your-room">
  <h2>Choose Your Room</h2>
  <div className="room-grid">
   {rooms.map((room, index) => (
      <a href={room.link} className="room-card" key={index}>
        <img src={room.img} alt={room.name} />
        <h3>{room.name}</h3>
      </a>
    ))}
  </div>
</section>
)
}
