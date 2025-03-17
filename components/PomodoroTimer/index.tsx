'use client';

import { useState } from 'react';
import Confetti from '../confettis/Confetti';
import { usePathname } from 'next/navigation';
import useConfetti from '../../hooks/pomodoro/useConfetti';
import Timer from './Timer';
import { BREAK_TIME, FOCUS_TIME } from '@/constant/numbers';
import { TimerStateType } from '@/types/pomodoro.type';
import Layout from './Layout';

import Draggable from './Draggable';

const getColor = (time: number, state: string) => {
  const colors = ['#22C55E', '#74B45C', '#BEA353', '#F28D61', '#F86969'];
  const progress = time / (state === 'focus' ? FOCUS_TIME : BREAK_TIME);

  const colorArray = state === 'focus' ? colors.slice().reverse() : colors;

  const index = Math.min(Math.floor(progress * colorArray.length), colorArray.length - 1);

  return colorArray[index];
};

export default function PomodoroTimer() {
  const pathname = usePathname();
  const [isExpanded, setIsExpanded] = useState(false);
  const [time, setTime] = useState(FOCUS_TIME);
  const [isRunning, setIsRunning] = useState(false);
  const [state, setState] = useState<TimerStateType>('focus');

  const { showConfetti, setShowConfetti } = useConfetti(isRunning, setTime, setState, state);

  if (pathname.includes('login') || pathname.includes('signup') || pathname === '/') return null;

  return (
    <>
      <Draggable isExpanded={isExpanded} setIsExpanded={setIsExpanded}>
        <Layout isExpanded={isExpanded} getColor={() => getColor(time, state)}>
          <Timer
            state={state}
            time={time}
            setTime={setTime}
            isRunning={isRunning}
            setIsRunning={setIsRunning}
          />
        </Layout>
      </Draggable>

      {showConfetti && <Confetti setShowConfetti={setShowConfetti} />}
    </>
  );
}
