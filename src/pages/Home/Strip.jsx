import React, { useState, useEffect } from 'react';
import { WordsPullUp } from '../../components/WordsPullUp';

export default function Strip() {
  const messages = [
    "New lessons on the way, keep learning!",
    "Your feedback is appreciated!",
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
    <div className="pt-14 sm:pt-15 md:pt-16">
      <div className="animated-gradient w-full h-6 flex items-center justify-center overflow-hidden">
        <WordsPullUp
          text={messages[currentMessageIndex]}
          className="font-outfit text-black text-[1rem] sm:text-xl md:text-xl xl:text-xl font-semibold m-0 p-0 cursor-default"
        />
      </div>
    </div>
  );
}