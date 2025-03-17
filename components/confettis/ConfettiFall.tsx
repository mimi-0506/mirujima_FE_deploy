'use client';

import { useState, useEffect } from 'react';
import { confettiType } from './Confetti';

export default function ConfettiFall() {
  const [confettiItems, setConfettiItems] = useState<confettiType[]>([]);

  useEffect(() => {
    const confettiArray = Array.from({ length: 20 }, () => ({
      text: '🍅',
      left: Math.random() * 80,
      top: Math.random() * -20 - 10,
      scale: Math.random() * 0.5 + 1,
      duration: Math.random() * 5000 + 5000,
      delay: Math.random() * 1000
    }));

    setConfettiItems(confettiArray);
  }, []);

  return (
    <div className="pointer-events-none absolute top-0 z-50 h-screen w-screen overflow-hidden">
      {confettiItems.map((confetti, index) => (
        <div
          key={index}
          className="absolute animate-confettiFall"
          style={{
            left: `${confetti.left}vw`,
            fontSize: `${confetti.scale * 3}rem`,
            top: `${confetti.top}vh`,
            animationDuration: `${confetti.duration}ms`,
            animationDelay: `${confetti.delay}ms`
          }}
        >
          {confetti.text}
        </div>
      ))}
    </div>
  );
}
