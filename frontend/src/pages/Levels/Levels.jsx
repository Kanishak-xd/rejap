import HiraganaLevels from "./LevelCards/HiraganaLevels";
import KatakanaLevels from "./LevelCards/KatakanaLevels";
import KanjiLevels from './LevelCards/KanjiLevels';
import TimeLevels from './LevelCards/TimeLevels';
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function Levels() {
  const location = useLocation();

  const scrollToHash = (hash) => {
    if (!hash) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    const el = document.querySelector(hash);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  // Handle React Router navigation (entering the page with a hash in the URL).
  useEffect(() => {
    scrollToHash(location.hash);
  }, [location]);

  // Handle same-page hash changes triggered by window.location.hash = "..." .
  useEffect(() => {
    const onHashChange = () => scrollToHash(window.location.hash);
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);


  return (
    <div className="bg-neutral-950">
      <div className="flex flex-col gap-8 pt-8 pb-12 px-4 sm:px-8 md:px-16 lg:px-20 xl:px-24 min-h-screen w-full max-w-7xl mx-auto text-white font-outfit">
        <HiraganaLevels chapter="hiragana" />
        <KatakanaLevels chapter="katakana" />
        <KanjiLevels chapter="kanji" />
        <TimeLevels chapter="time" />
      </div>
    </div>
  );
}