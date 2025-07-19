import React, { useState, useEffect } from 'react';
import { WordsPullUp } from '../../components/WordsPullUp';

export default function Strip() {
  const messages = [
    "Best viewed with display scale at 100% and browser zoom at 100%",
    "New lessons arriving soon, keep learning!",
    "Your feedback is invaluable for growing this platform",
    "Keep exploring the language!",
  ];

  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMessageIndex((prevIndex) =>
        (prevIndex + 1) % messages.length
      );
    }, 3000);

    return () => clearInterval(interval);
  }, [messages.length]);

  return (
    <div className="pt-18">
      <div className="animated-gradient w-full h-6 flex items-center justify-center overflow-hidden">
        <WordsPullUp
          text={messages[currentMessageIndex]}
          className="font-outfit text-black sm:text-sm md:text-md xl:text-xl font-semibold m-0 p-0 cursor-default"
        />
      </div>
    </div>
  );
}