'use client';

import { useState } from 'react';
import Confetti from '../confettis/Confetti';

import { usePathname } from 'next/navigation';
import { Rnd } from 'react-rnd';
import useConfetti from '../../hooks/pomodoro/useConfetti';
import useIsDrag from '../../hooks/pomodoro/useIsDrag';
import usePosition from '../../hooks/pomodoro/usePosition';
import Timer from './Timer';
import { BREAK_TIME, FOCUS_TIME } from '@/constant/numbers';
import { TimerStateType } from '@/types/pomodoro.type';
import Layout from './Layout';

export default function PomodoroTimer() {
  const pathname = usePathname();
  const [isExpanded, setIsExpanded] = useState(false);
  const [time, setTime] = useState(FOCUS_TIME);
  const [isRunning, setIsRunning] = useState(false);
  const [state, setState] = useState<TimerStateType>('focus');

  const { showConfetti, setShowConfetti } = useConfetti(isRunning, setTime, setState, state);
  const { position, setPosition } = usePosition();
  const { handleDragStart, handleDragStop } = useIsDrag(setIsExpanded, setPosition);

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
        position={{ x: position.x, y: position.y }}
        default={{
          x: position.x,
          y: position.y,
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
          onTouchStart={handleDragStart}
          onTouchEnd={handleDragStop}
        >
          <Layout isExpanded={isExpanded} getColor={getColor}>
            <Timer
              state={state}
              time={time}
              setTime={setTime}
              isRunning={isRunning}
              setIsRunning={setIsRunning}
            />
          </Layout>
        </div>
      </Rnd>

      {showConfetti && <Confetti setShowConfetti={setShowConfetti} />}
    </>
  );
}
