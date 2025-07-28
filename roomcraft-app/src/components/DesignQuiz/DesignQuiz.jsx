import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useState, useMemo } from "react";
import * as THREE from "three";

const questions = [
  {
    id: 1,
    question: "Your favorite animal?",
    options: [
      { id: "cat", label: "Cat" },
      { id: "dog", label: "Dog" },
      { id: "bird", label: "Bird" },
      { id: "fish", label: "Fish" },
    ],
  },
  {
    id: 2,
    question: "Choose a color",
    options: [
      { id: "blue", label: "Blue" },
      { id: "pink", label: "Pink" },
      { id: "green", label: "Green" },
      { id: "yellow", label: "Yellow" },
    ],
  },
  {
    id: 3,
    question: "Day or night?",
    options: [
      { id: "day", label: "Day" },
      { id: "night", label: "Night" },
    ],
  },
  {
    id: 4,
    question: "Pick a vibe",
    options: [
      { id: "cozy", label: "Cozy" },
      { id: "modern", label: "Modern" },
      { id: "boho", label: "Boho" },
      { id: "minimal", label: "Minimal" },
    ],
  },
];

function getRoomStyle(answers) {
  if (answers[2] === "pink" && answers[4] === "cozy") {
    return {
      name: "Blush Cozy",
      color: "#fce4ec",
    };
  }
  if (answers[2] === "blue" && answers[4] === "modern") {
    return {
      name: "Ocean Modern",
      color: "#e3f2fd",
    };
  }
  if (answers[3] === "night") {
    return {
      name: "Night Owl Nook",
      color: "#ede7f6",
    };
  }
  return {
    name: "Fresh Vibes",
    color: "#e8f5e9",
  };
}

function Box({ position, color }) {
  return (
    <mesh position={position}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
}

function Room({ roomColor }) {
  const boxes = useMemo(() => {
    const placed = new Set();
    const items = [];
    while (items.length < 25) {
      const x = Math.floor(Math.random() * 10) - 4.5;
      const z = Math.floor(Math.random() * 10) - 4.5;
      const key = `${x},${z}`;
      if (!placed.has(key)) {
        placed.add(key);
        items.push([x, 0.5, z]);
      }
    }
    return items;
  }, []);

  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[10, 10, 10, 10]} />
        <meshStandardMaterial color="#ffffff" wireframe side={THREE.DoubleSide} />
      </mesh>
      <mesh position={[0, 1, -5]}>
        <planeGeometry args={[10, 2]} />
        <meshStandardMaterial color={roomColor} side={THREE.DoubleSide} />
      </mesh>
      <mesh position={[-5, 1, 0]} rotation={[0, Math.PI / 2, 0]}>
        <planeGeometry args={[10, 2]} />
        <meshStandardMaterial color={roomColor} side={THREE.DoubleSide} />
      </mesh>
      <mesh position={[5, 1, 0]} rotation={[0, -Math.PI / 2, 0]}>
        <planeGeometry args={[10, 2]} />
        <meshStandardMaterial color={roomColor} side={THREE.DoubleSide} />
      </mesh>
      <mesh position={[0, 1, 5]} rotation={[0, Math.PI, 0]}>
        <planeGeometry args={[10, 2]} />
        <meshStandardMaterial color={roomColor} side={THREE.DoubleSide} />
      </mesh>
      {boxes.map((pos, i) => (
        <Box key={i} position={pos} color="#8e44ad" />
      ))}
    </>
  );
}

export function RoomWithQuiz() {
  const [answers, setAnswers] = useState({});
  const [showRoom, setShowRoom] = useState(false);

  const handleOptionClick = (qId, oId) => {
    setAnswers((prev) => ({ ...prev, [qId]: oId }));
  };

  const allAnswered = Object.keys(answers).length === questions.length;
  const result = showRoom ? getRoomStyle(answers) : null;

  return (
    <div>
      {!showRoom ? (
        <section className="vibe-section">
          <h2 className="vibe-title">What’s Your Room Vibe?</h2>
          <p className="vibe-subtitle">Take a quiz and get your perfect room match!</p>

          {questions.map(({ id, question, options }) => (
            <div key={id} className="vibe-question">
              <h3 className="vibe-question-title">{question}</h3>
              <div className="vibe-options">
                {options.map(({ id: optId, label }) => {
                  const selected = answers[id] === optId;
                  return (
                    <button
                      key={optId}
                      className={`vibe-option-button${selected ? " selected" : ""}`}
                      onClick={() => handleOptionClick(id, optId)}
                      type="button"
                    >
                      {label}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}

          <div className="vibe-button-container">
            <button
              className="vibe-submit-button"
              disabled={!allAnswered}
              onClick={() => setShowRoom(true)}
              type="button"
            >
              Build It!
            </button>
          </div>
        </section>
      ) : (
        <div style={{ height: "600px" }}>
          <h2 className="room-title" style={{ textAlign: "center", margin: "10px 0" }}>
            Here’s your personalized room!
          </h2>
          <Canvas camera={{ position: [0, 6, 12], fov: 50 }} shadows>
            <OrbitControls />
            <Room roomColor={result.color} />
          </Canvas>
        </div>
      )}
    </div>
  );
}
