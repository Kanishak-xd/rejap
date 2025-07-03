import { useEffect, useState } from "react";
import HiraganaLevels from "./LevelCards/HiraganaLevels";
import KatakanaLevels from "./LevelCards/KatakanaLevels";
import KanjiLevels from './LevelCards/KanjiLevels';
import TimeLevels from './LevelCards/TimeLevels';

export default function Levels() {
  const [activeTab, setActiveTab] = useState("hiragana");

  // Set tab based on hash
  useEffect(() => {
    const hash = window.location.hash.slice(1); // remove #
    if (["hiragana", "katakana", "kanji", "time"].includes(hash)) {
      setActiveTab(hash);
    } else {
      // default tab if no valid hash
      setActiveTab("hiragana");
      window.location.hash = "hiragana";
    }

    // Update when hash changes manually (e.g., back/forward button)
    const handleHashChange = () => {
      const newHash = window.location.hash.slice(1);
      setActiveTab(newHash);
    };

    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  // On tab click, update the hash
  const handleTabClick = (tabName) => {
    window.location.hash = tabName;
  };

  return (
    <div className="flex gap-[20px] flex-col items-center w-screen h-screen">
      <div className="w-screen grow mt-20">
        <div className="tabs tabs-lift h-full">
          <label className="tab font-outfit text-[1.15rem]">
            <input
              type="radio"
              name="my_tabs_1"
              checked={activeTab === "hiragana"}
              onChange={() => handleTabClick("hiragana")}
            />
            Chapter 1: Hiragana
          </label>
          <div className="tab-content bg-base-100 border-base-300 p-6">
            {activeTab === "hiragana" && <HiraganaLevels chapter="hiragana" />}
          </div>

          <label className="tab font-outfit text-[1.15rem]">
            <input
              type="radio"
              name="my_tabs_1"
              checked={activeTab === "katakana"}
              onChange={() => handleTabClick("katakana")}
            />
            Chapter 2: Katakana
          </label>
          <div className="tab-content bg-base-100 border-base-300 p-6">
            {activeTab === "katakana" && <KatakanaLevels chapter="katakana" />}
          </div>

          <label className="tab font-outfit text-[1.15rem]">
            <input
              type="radio"
              name="my_tabs_1"
              checked={activeTab === "kanji"}
              onChange={() => handleTabClick("kanji")}
            />
            Chapter 3: Kanji
          </label>
          <div className="tab-content bg-base-100 border-base-300 p-6">
            {activeTab === "kanji" && <KanjiLevels chapter="kanji" />}
          </div>

          <label className="tab font-outfit text-[1.15rem]">
            <input
              type="radio"
              name="my_tabs_1"
              checked={activeTab === "time"}
              onChange={() => handleTabClick("time")}
            />
            Chapter 4: Time
          </label>
          <div className="tab-content bg-base-100 border-base-300 p-6">
            {activeTab === "time" && <TimeLevels chapter="time" />}
          </div>
        </div>
      </div>
    </div>
  );
}
