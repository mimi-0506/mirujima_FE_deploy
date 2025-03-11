'use client';

import { useState, useEffect, Dispatch, SetStateAction } from 'react';

type confettiType = {
  text: string;
  left: number;
  top: number;
  scale: number;
  delay?: number;
  duration: number;
};

export default function Confetti({
  setShowConfetti
}: {
  setShowConfetti: Dispatch<SetStateAction<boolean>>;
}) {
  const [confettiPlayers, setConfettiPlayers] = useState<confettiType[]>([]);
  const [animationCount, setAnimationCount] = useState(0); // 애니메이션 완료된 confetti 수 추적

  useEffect(() => {
    const players = Array.from({ length: 30 }, () => ({
      text: '🍅',
      left: Math.random() * 80,
      top: Math.random() * -25 - 30,
      scale: Math.random() * 0.7 + 1,
      delay: Math.random() * 5000, // 연속재생
      duration: Math.random() * 1000 + 2000
    }));

    setConfettiPlayers(players);
  }, []);

  useEffect(() => {
    if (confettiPlayers.length > 0 && animationCount === confettiPlayers.length)
      setShowConfetti(false);
  }, [animationCount]);

  const handleAnimationEnd = () => {
    setAnimationCount((prevCount) => prevCount + 1);
  };

  return (
    <div className="pointer-events-none absolute top-0 z-50 h-screen w-screen overflow-hidden">
      {Array.isArray(confettiPlayers) &&
        confettiPlayers.map((confetti, index) => (
          <div
            key={`conffet${index}`}
            className="absolute animate-confetti"
            style={{
              left: `${confetti.left}vw`,
              fontSize: `${confetti.scale * 3}rem`,
              top: `${confetti.top}vh`,
              animationDuration: `${confetti.duration}ms`,
              animationName: 'confettiAnimation',
              // animationDelay: `${confetti.delay}`
              animationIterationCount: 1
            }}
            onAnimationEnd={handleAnimationEnd}
          >
            {confetti.text}
          </div>
        ))}
    </div>
  );
}
