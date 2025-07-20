import HiraganaLevels from "./LevelCards/HiraganaLevels";
import KatakanaLevels from "./LevelCards/KatakanaLevels";
import KanjiLevels from './LevelCards/KanjiLevels';
import TimeLevels from './LevelCards/TimeLevels';
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Footer from "../../components/Footer";

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
      <div className="flex flex-col gap-12 pt-36 pb-16 pl-42 min-h-screen w-2/3 text-white font-outfit">
        <HiraganaLevels chapter="hiragana" />
        <KatakanaLevels chapter="katakana" />
        <KanjiLevels chapter="kanji" />
        <TimeLevels chapter="time" />
      </div>
      <Footer />
    </div>
  );
}
