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

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [chapter, level]);

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
    return <div className="p-6 text-red-500 bg-black min-h-screen flex items-center justify-center">Loading quiz...</div>;
  }

  if (showResult) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-4 bg-black text-white px-4 sm:px-6">
        <h2 className="text-2xl sm:text-3xl font-bold text-center">
          {lives > 0 ? "Level Completed!" : "Game Over"}
        </h2>
        <p className="text-lg sm:text-xl font-semibold">Correct Answers: {currentIndex + 1}</p>

        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-4">
          <button
            className="px-6 py-2 bg-orange-200 rounded-lg hover:bg-[#b5917a] transition text-black font-bold"
            onClick={handleRetry}
          >
            RETRY
          </button>
          <button
            className="px-6 py-2 bg-[#BFECFF] rounded-lg hover:bg-[#99bac9] transition text-black font-bold"
            onClick={() => navigate("/levels/")}
          >
            NEXT
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center pt-20 sm:pt-20 px-4 sm:px-6 py-6 sm:py-8 min-h-screen bg-black text-white font-outfit">
      <div className="w-full h-20 sm:h-30 md:h-40 relative flex items-center justify-center">
        <img src="https://res.cloudinary.com/dykzzd9sy/image/upload/v1752022256/sakura-3_l8klit.webp" className="w-full h-full object-cover rounded-t-xl sm:rounded-t-2xl" alt="Sakura background" />
        <h1 className="text-2xl sm:text-5xl md:text-6xl font-bold absolute text-center bottom-5 sm:bottom-8 md:bottom-12 px-4">
          {chapter.toUpperCase()} LEVEL {level}
        </h1>
      </div>

      <div className="flex flex-row gap-3 sm:gap-6 w-full max-w-4xl items-center justify-start md:justify-center mt-4 sm:mt-6">
        <button onClick={() => navigate("/levels/")} className="py-1 px-3 bg-neutral-900 rounded-md border border-neutral-800 cursor-pointer hover:scale-95 transition-transform">
          <svg className="w-4 sm:w-8 h-4 sm:h-8 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" strokeWidth="4" d="m15 19-7-7 7-7" />
          </svg>
        </button>
        <p className="text-base sm:text-3xl md:text-3xl font-semibold text-center sm:text-left">Select the correct option</p>
      </div>

      <div
        className={`font-shippori text-6xl sm:text-7xl md:text-9xl font-bold px-6 sm:px-8 md:px-10 py-8 sm:py-10 rounded-2xl sm:rounded-3xl shadow-lg transition-all duration-300 ${highlightCorrect ? "border-4 sm:border-7 border-[#89AC46]" : "bg-neutral-900 border-4 sm:border-7 border-[#101010]"
          } mt-6 sm:mt-8`}
      >
        {shuffledQuestions[currentIndex]?.syllable}
      </div>

      <div className={`grid ${shuffledOptions.length === 2 ? "grid-cols-2" : shuffledOptions.length === 3 ? "grid-cols-3" : "grid-cols-4"} gap-2 sm:gap-4 w-full max-w-md mt-6 sm:mt-8`}>
        {shuffledOptions.map((opt, idx) => {
          const romajiIndex = levelData.syllables.indexOf(opt);
          const romaji = levelData.romaji?.[romajiIndex] || opt;

          return (
            <button key={idx} onClick={() => handleAnswer(opt)}
              className="bg-neutral-900 border-4 border-[#101010] hover:bg-neutral-800 hover:border-neutral-900 hover:cursor-pointer text-white text-base sm:text-lg text-center py-3 sm:py-4 rounded-xl sm:rounded-2xl shadow transition-all duration-200"
            >
              {romaji}
            </button>
          );
        })}
      </div>

      <div className="w-full max-w-md flex justify-center items-center mt-6 sm:mt-8"><HPBar lives={lives} /></div>
    </div>
  );
}