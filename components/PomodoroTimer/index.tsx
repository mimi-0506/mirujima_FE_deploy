'use client';

import { useState, useEffect } from 'react';
import Confetti from '../Confetti';
import Test from '@/public/images/logo/stem.png';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Rnd } from 'react-rnd';

const FOCUS_TIME = 10; // 25 * 60;
const BREAK_TIME = 5; // 5 * 60;

type TimerState = 'focus' | 'break';

export default function PomodoroTimer() {
  const pathname = usePathname();
  const [time, setTime] = useState(FOCUS_TIME);
  const [isRunning, setIsRunning] = useState(false);
  const [state, setState] = useState<TimerState>('focus');
  const [isExpanded, setIsExpanded] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false); // Confetti 표시 여부
  const [dragStart, setDragStart] = useState<{ x: number; y: number } | null>(null);

  useEffect(() => {
    if (!isRunning) return;
    const timer = setInterval(() => {
      setTime((prev) => {
        if (prev === 0) {
          setState((now) => (now === 'focus' ? 'break' : 'focus'));
          setTime(state === 'focus' ? FOCUS_TIME : BREAK_TIME);
          return 0;
        }

        // 컨페티 애니메이션 초기 동작 시간이 1초 정도 소요되므로, 1초일때 컨페티 시작
        if (prev <= 1) setShowConfetti(true);
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isRunning, state]);

  const handleToggle = (e: React.MouseEvent) => {
    setIsExpanded((prev) => !prev);
  };

  const handleStartPause = (e: React.MouseEvent) => {
    setIsRunning((prev) => !prev);
  };

  const handleReset = (e: React.MouseEvent) => {
    setTime(state === 'focus' ? FOCUS_TIME : BREAK_TIME);
    setIsRunning(false);
  };

  const handleDragStart = (e: React.MouseEvent) => {
    setDragStart({ x: e.clientX, y: e.clientY });
  };

  const handleDragStop = (e: React.MouseEvent) => {
    if (dragStart) {
      const dx = e.clientX - dragStart.x;
      const dy = e.clientY - dragStart.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      // 만약 드래그 거리가 일정 이상이면 클릭으로 인식하지 않도록
      if (distance <= 5) handleToggle(e);
    }
  };

  const getColor = () => {
    const colors = ['#22C55E', '#74B45C', '#BEA353', '#F28D61', '#F86969'];
    const progress = time / (state === 'focus' ? FOCUS_TIME : BREAK_TIME);

    const colorArray = state === 'focus' ? colors.slice().reverse() : colors;

    const index = Math.min(Math.floor(progress * colorArray.length), colorArray.length - 1);

    return colorArray[index];
  };

  if (pathname.includes('login') || pathname.includes('signup') || pathname === '/') return null;

  return (
    <>
      <Rnd
        bounds="window"
        default={{
          x: window.innerWidth - 100,
          y: 0,
          width: isExpanded ? 320 : 80,
          height: isExpanded ? 320 : 80
        }}
        className="z-50"
      >
        <div
          className={`fixed right-6 top-6 flex cursor-pointer items-center justify-center transition-all duration-500 ease-in-out ${
            isExpanded ? '-translate-x-[2vw] translate-y-[2vw]' : ''
          }`}
          onMouseDown={handleDragStart}
          onMouseUp={handleDragStop}
        >
          <div className="relative h-full w-full">
            <Image
              src={Test}
              width={30}
              height={30}
              alt="stem"
              className={'absolute top-[-10px] z-20 transition-all duration-500 ease-in-out'}
            />

            <div
              className={`cursor-pointer items-center justify-center overflow-hidden shadow-lg transition-all duration-500 ease-in-out ${
                isExpanded ? 'h-80 w-80 rounded-3xl' : 'h-20 w-20 rounded-full'
              }`}
              style={{ backgroundColor: getColor() }}
            >
              <div className="flex h-full w-full flex-col items-center justify-center">
                <h1 className="mb-5 text-3xl text-white">
                  {state === 'focus' ? 'Focus' : 'Break'}
                </h1>

                <h2 className="py-5 text-2xl font-bold text-white">
                  {`${Math.floor(time / 60)}:${String(time % 60).padStart(2, '0')}`}
                </h2>

                <div className="mt-4 flex gap-4">
                  <button
                    onClick={handleStartPause}
                    className="rounded bg-blue-500 px-4 py-2 text-white"
                  >
                    {isRunning ? 'Pause' : 'Start'}
                  </button>
                  <button
                    onClick={handleReset}
                    className="rounded bg-gray-500 px-4 py-2 text-white"
                  >
                    Reset
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Rnd>
      {showConfetti && <Confetti setShowConfetti={setShowConfetti} />}
    </>
  );
}
