import  { useState } from "react";
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
  if (answers["2"] === "pink" && answers["4"] === "cozy") {
    return {
      name: "Blush Cozy",
      description:
        "A warm, inviting room with soft pink hues and comfy textures perfect for relaxation.",
    };
  }
  if (answers["2"] === "blue" && answers["4"] === "modern") {
    return {
      name: "Ocean Modern",
      description:
        "A sleek, modern room with calming blue tones and minimalist design.",
    };
  }
  if (answers["3"] === "night") {
    return {
      name: "Night Owl Nook",
      description:
        "A moody, intimate space perfect for night-time inspiration and calm.",
    };
  }
  return {
    name: "Fresh Vibes",
    description:
      "A balanced and fresh room combining natural colors and comfortable elements.",
  };
}

export const Vibe = () => {
  const [answers, setAnswers] = useState({});
  const [showResult, setShowResult] = useState(false);

  const handleOptionClick = (qId, oId) => {
    setAnswers((prev) => ({ ...prev, [qId]: oId }));
  };

  const allAnswered = Object.keys(answers).length === questions.length;
  const result = showResult ? getRoomStyle(answers) : null;

  return (
    <section className="vibe-section">
      <h2 className="vibe-title">What’s Your Room Vibe?</h2>
      <p className="vibe-subtitle">Take a quiz and get your perfect room match!</p>

      {!showResult && (
        <>
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
              onClick={() => setShowResult(true)}
              type="button"
            >
              Build It!
            </button>
          </div>
        </>
      )}

      {showResult && result && (
        <div className="vibe-result">
          <h3 className="vibe-result-title">Your Room Style: {result.name}</h3>
          <p className="vibe-result-description">{result.description}</p>
          <button
            className="vibe-build-button"
            type="button"
            onClick={() => alert(`Building your ${result.name} room!`)}
          >
            Build It!
          </button>
          <button
            className="vibe-try-again-button"
            type="button"
            onClick={() => {
              setAnswers({});
              setShowResult(false);
            }}
          >
            Try Again
          </button>
        </div>
      )}
    </section>
  );
};