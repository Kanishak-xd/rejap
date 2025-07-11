import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { auth } from "../../firebase.jsx";
import syllableData from "../../data/syllableData.jsx";
import { useAuth } from '../../context/AuthContext.jsx';
import HPBar from './HPBar';

export default function QuizPage() {
  const { chapter, level } = useParams();
  const navigate = useNavigate();
  const levelData = syllableData[chapter]?.[level];
  const { user } = useAuth();

  const [shuffledQuestions, setShuffledQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [shuffledOptions, setShuffledOptions] = useState([]);
  const [lives, setLives] = useState(300);
  const [showResult, setShowResult] = useState(false);
  const [highlightCorrect, setHighlightCorrect] = useState(false);
  const [progressSaved, setProgressSaved] = useState(false);

  const hasLoggedRef = useRef(false);

  useEffect(() => {
    if (!user || !levelData || hasLoggedRef.current) return;

    hasLoggedRef.current = true;

    fetch(`${import.meta.env.VITE_BACKEND_URL}/api/users/${user.uid}`)
      .then(res => res.json())
      .then(data => {
        fetch(`${import.meta.env.VITE_BACKEND_URL}/api/logs`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            uid: user.uid,
            username: data.username || "Unnamed",
            action: `started level ${level} in chapter ${chapter}`,
          }),
        });
      })
      .catch(err => console.error("Failed to log quiz start:", err));
  }, [user, levelData]);

  useEffect(() => {
    if (!levelData) return;

    const combined = levelData.syllables.map((syl, idx) => ({
      syllable: syl,
      romaji: levelData.romaji?.[idx] || "",
    }));

    const shuffled = [...combined].sort(() => Math.random() - 0.5);
    setShuffledQuestions(shuffled);
    generateOptions(shuffled[0].syllable);
  }, [levelData]);

  const generateOptions = (correct) => {
    const all = [...new Set(levelData.syllables)];
    const options = [correct];

    while (options.length < Math.min(4, all.length)) {
      const rand = all[Math.floor(Math.random() * all.length)];
      if (!options.includes(rand)) options.push(rand);
    }

    const shuffled = options.sort(() => Math.random() - 0.5);
    setShuffledOptions(shuffled);
  };

  const handleAnswer = (choice) => {
    const correct = shuffledQuestions[currentIndex].syllable;

    if (choice === correct) {
      setHighlightCorrect(true);
      setTimeout(() => {
        setHighlightCorrect(false);

        if (currentIndex + 1 === shuffledQuestions.length) {
          setShowResult(true);

          const user = auth.currentUser;
          if (user && !progressSaved) {
            fetch(`${import.meta.env.VITE_BACKEND_URL}/api/users/progress`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ uid: user.uid, chapter, level }),
            })
              .then((res) => res.json())
              .then(() => setProgressSaved(true))
              .catch((err) => console.error("Failed to save progress:", err));
          }
        } else {
          const nextIndex = currentIndex + 1;
          setCurrentIndex(nextIndex);
          generateOptions(shuffledQuestions[nextIndex].syllable);
        }
      }, 600);
    } else {
      if (lives > 100) {
        setLives(prev => prev - 100);
      } else {
        setLives(0);
        setShowResult(true);
      }
    }
  };

  const handleRetry = () => {
    setCurrentIndex(0);
    setLives(300);
    setShowResult(false);
    setProgressSaved(false);

    const shuffled = levelData.syllables.map((syl, idx) => ({
      syllable: syl,
      romaji: levelData.romaji?.[idx] || ""
    })).sort(() => Math.random() - 0.5);

    setShuffledQuestions(shuffled);
    generateOptions(shuffled[0].syllable);
  };

  if (!levelData || shuffledQuestions.length === 0) {
    return <div className="p-10 text-red-500 bg-black h-screen">Loading quiz...</div>;
  }

  if (showResult) {
    return (
      <div className="flex flex-col items-center justify-center h-screen gap-4 bg-black text-white">
        <h2 className="text-3xl font-bold">
          {lives > 0 ? "Level Completed!" : "Game Over"}
        </h2>
        <p className="text-xl font-semibold">Correct Answers: {currentIndex + 1}</p>

        <div className="flex gap-4">
          <button
            className="px-6 py-2 bg-orange-200 rounded hover:bg-[#b5917a] transition text-black font-bold cursor-pointer"
            onClick={handleRetry}
          >
            RETRY
          </button>
          <button
            className="px-6 py-2 bg-[#BFECFF] rounded hover:bg-[#99bac9] transition text-black font-bold cursor-pointer"
            onClick={() => navigate("/levels/")}
          >
            NEXT
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center px-6 py-10 min-h-screen bg-black text-white font-outfit">
      <div className="w-full h-35 relative flex items-center justify-center mt-[2%]">
        <img src="https://res.cloudinary.com/dykzzd9sy/image/upload/v1752022256/sakura-3_l8klit.webp" className="w-full h-full object-cover rounded-t-2xl" alt="Sakura background" />
        <h1 className="text-7xl font-bold absolute text-shadow-lg bottom-10">
          {chapter.toUpperCase()} LEVEL {level}
        </h1>
      </div>
      <div className="flex gap-8 w-3/10 items-center">
        <button onClick={() => navigate("/levels/")} className="py-1 px-5 bg-neutral-900 rounded-lg border-1 border-neutral-800 cursor-pointer hover:scale-96">
          <svg class="w-8 h-8 text-white dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" stroke-width="4" d="m15 19-7-7 7-7" />
          </svg>
        </button>
        <p className="text-4xl font-semibold py-10">Select the correct option</p>
      </div>

      <div
        className={`font-shippori text-9xl font-bold px-10 py-10 rounded-3xl shadow-lg transition-all duration-300 ${highlightCorrect ? " border-7 border-[#89AC46]" : "bg-neutral-900 border-7 border-[#101010]"
          }`}
      >
        {shuffledQuestions[currentIndex]?.syllable}
      </div>

      <div className={`grid ${shuffledOptions.length === 2 ? "grid-cols-2" : shuffledOptions.length === 3 ? "grid-cols-3" : "grid-cols-4"} gap-4 w-3/10 mt-7 mb-10`}>
        {shuffledOptions.map((opt, idx) => {
          const romajiIndex = levelData.syllables.indexOf(opt);
          const romaji = levelData.romaji?.[romajiIndex] || opt;

          return (
            <button key={idx} onClick={() => handleAnswer(opt)}
              className="bg-neutral-900 border-6 border-[#101010] hover:bg-neutral-800 hover:border-neutral-900 hover:cursor-pointer text-white text-xl py-4 px-6 rounded-2xl shadow transition">
              {romaji}
            </button>
          );
        })}
      </div>

      <div className="w-3/10 flex justify-center items-center"><HPBar lives={lives} /></div>
    </div>
  );
}
