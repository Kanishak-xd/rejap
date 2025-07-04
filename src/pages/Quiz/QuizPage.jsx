import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import syllableData from "../../data/syllableData";

export default function QuizPage() {
  const { chapter, level } = useParams();
  const levelData = syllableData[chapter]?.[level];

  const [shuffledQuestions, setShuffledQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [shuffledOptions, setShuffledOptions] = useState([]);
  const [lives, setLives] = useState(3);
  const [showResult, setShowResult] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!levelData) return;

    // Pair syllables with romaji
    const combined = levelData.syllables.map((syl, idx) => ({
      syllable: syl,
      romaji: levelData.romaji?.[idx] || "",
    }));

    // Shuffle questions
    const shuffled = [...combined].sort(() => Math.random() - 0.5);
    setShuffledQuestions(shuffled);

    // Generate options for the first one
    generateOptions(shuffled[0].syllable);
  }, []);

  const generateOptions = (correct) => {
    const all = [...levelData.syllables];
    const options = [correct];

    while (options.length < 4) {
      const rand = all[Math.floor(Math.random() * all.length)];
      if (!options.includes(rand)) options.push(rand);
    }

    const shuffled = options.sort(() => Math.random() - 0.5);
    setShuffledOptions(shuffled);
  };

  const handleAnswer = (choice) => {
    const correct = shuffledQuestions[currentIndex].syllable;

    if (choice === correct) {
      if (currentIndex + 1 === shuffledQuestions.length) {
        setShowResult(true);
      } else {
        setMessage("Correct!");
        setTimeout(() => {
          setMessage("");
          const nextIndex = currentIndex + 1;
          setCurrentIndex(nextIndex);
          generateOptions(shuffledQuestions[nextIndex].syllable);
        }, 500);
      }
    } else {
      setLives((prev) => prev - 1);
      setMessage("Wrong!");
      if (lives - 1 === 0) {
        setTimeout(() => setShowResult(true), 500);
      } else {
        setTimeout(() => setMessage(""), 700);
      }
    }
  };

  if (!levelData) {
    return <div className="p-10 text-red-500 bg-black h-screen">Invalid level or chapter</div>;
  }

  if (showResult) {
    return (
      <div className="flex flex-col items-center justify-center h-screen gap-4 bg-black text-white">
        <h2 className="text-3xl font-bold">
          {lives > 0 ? "Quiz Completed!" : "Game Over"}
        </h2>
        <p className="text-lg">Correct Answers: {currentIndex}</p>
        <p className="text-lg">Lives Remaining: {lives}</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-10 px-6 py-10 min-h-screen bg-black text-white">
      <div className="flex justify-between w-full max-w-md">
        <p className="text-lg">Level: {level}</p>
        <p className="text-lg">Lives: {lives}</p>
      </div>

      <div className="text-6xl font-bold bg-gray-800 px-10 py-6 rounded-lg shadow-lg">
        {shuffledQuestions[currentIndex]?.syllable}
      </div>

      <div className="grid grid-cols-2 gap-4 w-full max-w-md">
        {shuffledOptions.map((opt, idx) => {
          const romajiIndex = levelData.syllables.indexOf(opt);
          const romaji = levelData.romaji?.[romajiIndex] || opt;

          return (
            <button
              key={idx}
              onClick={() => handleAnswer(opt)}
              className="bg-gray-700 hover:bg-gray-600 text-white text-xl py-4 px-6 rounded shadow transition"
            >
              {romaji}
            </button>
          );
        })}
      </div>

      {message && (
        <div className="text-xl font-semibold text-center mt-4">{message}</div>
      )}
    </div>
  );
}
