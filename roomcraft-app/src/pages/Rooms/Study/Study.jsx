import React, { useState, useEffect } from "react";

const canvasWidth = 600;
const canvasHeight = 400;
const itemTypes = ["📘", "✏️", "📐", "📓", "🧮"];

const getRandomItem = () => ({
  id: Math.random().toString(36).substr(2, 9),
  type: itemTypes[Math.floor(Math.random() * itemTypes.length)],
  x: Math.random() * (canvasWidth - 30),
  y: 0,
});

export const Study = () => {
  const [backpackX, setBackpackX] = useState(canvasWidth / 2 - 30);
  const [items, setItems] = useState([]);
  const [score, setScore] = useState(0);
  const [missed, setMissed] = useState(0);
  const [paused, setPaused] = useState(false);
  const backpackWidth = 60;
  const backpackHeight = 30;

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (paused) return;
      if (e.key === "ArrowLeft") {
        setBackpackX((x) => Math.max(0, x - 20));
      } else if (e.key === "ArrowRight") {
        setBackpackX((x) => Math.min(canvasWidth - backpackWidth, x + 20));
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [paused]);

  useEffect(() => {
    if (paused) return;
    const interval = setInterval(() => {
      setItems((prev) => [...prev, getRandomItem()]);
    }, 1000);
    return () => clearInterval(interval);
  }, [paused]);

  useEffect(() => {
    if (paused) return; 
    const timer = setInterval(() => {
      setItems((prevItems) => {
        const newItems = [];
        prevItems.forEach((item) => {
          const newY = item.y + 2;
          const caught =
            newY + 20 >= canvasHeight - backpackHeight &&
            item.x + 20 >= backpackX &&
            item.x <= backpackX + backpackWidth;

          if (caught) {
            setScore((s) => s + 1);
          } else if (newY > canvasHeight) {
            setMissed((m) => m + 1);
          } else {
            newItems.push({ ...item, y: newY });
          }
        });
        return newItems;
      });
    }, 20);

    return () => clearInterval(timer);
  }, [backpackX, paused]);

  return (
    <>
       <h2 className="study-header">
        🚧 Room Under Construction — Sorry for the inconvenience.<br />
        Meanwhile, you can play this game!
      </h2>
    <div className="study-container">
      <h2 className="study-header">🎒 Backpack Grabber</h2>

      <div className="backpack" style={{ left: backpackX }}>
        🎒
      </div>

      {items.map((item) => (
        <div
          key={item.id}
          className="falling-item"
          style={{ top: item.y, left: item.x }}
        >
          {item.type}
        </div>
      ))}

      <div className="score">Score: {score}</div>
      <div className="missed">Missed: {missed}</div>

      {missed >= 5 && (
        <div className="game-over">
          💥 Game Over! Final Score: {score}
        </div>
      )}
    </div>
         <button
        className="pause-btn"
        onClick={() => setPaused((p) => !p)}
      >
        {paused ? "▶️ Resume" : "⏸️ Pause"}
      </button>
     </>
  );
 
};
