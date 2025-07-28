import PinkImage from "../../assets/images/cozy-pink-color.jpg";
import CyberImage from "../../assets/images/cyber-night-color.jpg";
import RetroImage from "../../assets/images/retro-color.jpg";
import OceanBreeze from "../../assets/images/ocean-breeze-color.jpg";
import FairyPastel from "../../assets/images/fairy-pastel-room.jpg";
import SkyPastel from "../../assets/images/sky-pastel-room.jpg";
const styles = [
  { id: 1, name: "Cozy Pink", image:PinkImage  },
  { id: 2, name: "Cyber Night", image: CyberImage },
  { id: 3, name: "Retro Dream", image: RetroImage },
  { id: 4, name: "Ocean Breeze", image: OceanBreeze },
  { id: 5, name: "Fairy Pastel", image: FairyPastel },
  { id: 6, name: "Sky Pastel", image: SkyPastel },
];

export const StyleShop = () => {
  const handleApply = (styleName) => {
    alert(`You selected: ${styleName}`);
  };

  return (
    <section className="style-shop">
      <h2 className="shop-title">🛍️ Choose Your Room Style</h2>
      <div className="style-grid">
        {styles.map((style) => (
          <div className="style-card" key={style.id}>
            <img src={style.image} alt={style.name} className="style-image" />
            <h3>{style.name}</h3>
            <button onClick={() => handleApply(style.name)}>Apply</button>
          </div>
        ))}
      </div>
    </section>
  );
};