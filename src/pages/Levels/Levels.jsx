import HiraganaLevels from "./LevelCards/HiraganaLevels";
import KatakanaLevels from "./LevelCards/KatakanaLevels";
import KanjiLevels from './LevelCards/KanjiLevels';
import TimeLevels from './LevelCards/TimeLevels';
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function Levels() {
  const location = useLocation();

  useEffect(() => {
    if (!location.hash) {
      // No #hash then go to top
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      // If #hash then go to element
      const el = document.querySelector(location.hash);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [location]);
  return (
    <div className="bg-neutral-950">
      <div className="flex flex-col gap-8 pt-24 pb-12 px-4 sm:px-8 md:px-16 lg:px-20 xl:px-24 min-h-screen w-full max-w-7xl mx-auto text-white font-outfit">
        <HiraganaLevels chapter="hiragana" />
        <KatakanaLevels chapter="katakana" />
        <KanjiLevels chapter="kanji" />
        <TimeLevels chapter="time" />
      </div>
    </div>
  );
}