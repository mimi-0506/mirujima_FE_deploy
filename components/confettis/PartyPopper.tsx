'use client';

import { useEffect, useRef } from 'react';
import ReactCanvasConfetti from 'react-canvas-confetti';
import type { CreateTypes } from 'canvas-confetti';

export default function Confetti() {
  const confettiInstance = useRef<CreateTypes | null>(null);

  const getInstance = ({ confetti }: { confetti: CreateTypes }) => {
    confettiInstance.current = confetti;
  };

  const makeShot = (particleRatio: number, opts: object) => {
    if (confettiInstance.current) {
      confettiInstance.current({
        ...opts,
        origin: { y: 0.7 },
        particleCount: Math.floor(200 * particleRatio)
      });
    }
  };

  const fire = () => {
    makeShot(0.25, { spread: 26, startVelocity: 55 });
    makeShot(0.2, { spread: 60 });
    makeShot(0.35, { spread: 100, decay: 0.91, scalar: 0.8 });
    makeShot(0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2 });
    makeShot(0.1, { spread: 120, startVelocity: 45 });
  };

  useEffect(() => {
    if (confettiInstance.current) fire();
  }, []);

  return (
    <ReactCanvasConfetti
      onInit={getInstance}
      style={{
        position: 'fixed',
        pointerEvents: 'none',
        width: '100%',
        height: '100%',
        top: 0,
        left: 0
      }}
    />
  );
}
