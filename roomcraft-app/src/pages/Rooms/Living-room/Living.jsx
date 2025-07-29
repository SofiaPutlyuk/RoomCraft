import React, { useState, useEffect } from "react";

const width = 600;
const height = 400;

const items = [
  { type: "🎮", isGood: true },
  { type: "📝", isGood: false },
  { type: "🧦", isGood: false },
  { type: "🍂", isGood: false },
  { type: "🎮", isGood: true },
];

const getRandomItem = () => {
  const item = items[Math.floor(Math.random() * items.length)];
  return {
    id: Math.random().toString(36).substr(2, 9),
    type: item.type,
    isGood: item.isGood,
    x: Math.random() * (width - 30),
    y: 0,
  };
};

export const LivingRoomGame = () => {
  const [pillowX, setPillowX] = useState(width / 2 - 40);
  const [fallingItems, setFallingItems] = useState([]);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const pillowWidth = 80;
  const pillowHeight = 40;

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (lives <= 0) return;
      if (e.key === "ArrowLeft") {
        setPillowX((x) => Math.max(0, x - 20));
      } else if (e.key === "ArrowRight") {
        setPillowX((x) => Math.min(width - pillowWidth, x + 20));
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lives]);

  useEffect(() => {
    if (lives <= 0) return;
    const spawnInterval = setInterval(() => {
      setFallingItems((prev) => [...prev, getRandomItem()]);
    }, 1200);
    return () => clearInterval(spawnInterval);
  }, [lives]);

  useEffect(() => {
    if (lives <= 0) return;
    const fallInterval = setInterval(() => {
      setFallingItems((prev) => {
        const newItems = [];
        prev.forEach((item) => {
          const newY = item.y + 3;
          const caught =
            newY + 30 >= height - pillowHeight &&
            item.x + 30 >= pillowX &&
            item.x <= pillowX + pillowWidth;

          if (caught) {
            if (item.isGood) {
              setScore((s) => s + 1);
            } else {
              setLives((l) => l - 1);
            }
          } else if (newY > height) {
          } else {
            newItems.push({ ...item, y: newY });
          }
        });
        return newItems;
      });
    }, 30);
    return () => clearInterval(fallInterval);
  }, [pillowX, lives]);

  return (
    <div className="game-container" style={{ width, height }}>
      <h2 className="game-title">🛋️ Catch the Remote!</h2>

      <div
        className="pillow"
        style={{ left: pillowX, width: pillowWidth, height: pillowHeight }}
      >
        🛏️
      </div>

      {fallingItems.map((item) => (
        <div
          key={item.id}
          className="falling-item"
          style={{ top: item.y, left: item.x }}
        >
          {item.type}
        </div>
      ))}

      <div className="score">Score: {score}</div>
      <div className="lives">Lives: {lives}</div>

      {lives <= 0 && (
        <div className="game-over">
          💥 Game Over! Final Score: {score}
        </div>
      )}
    </div>
  );
};
