import { BREAK_TIME, FOCUS_TIME } from '@/constant/numbers';
import { TimerStateType } from '@/types/pomodoro.type';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';

export default function useConfetti(
  isRunning: boolean,
  setTime: Dispatch<SetStateAction<number>>,
  setState: Dispatch<SetStateAction<TimerStateType>>,
  state: TimerStateType
) {
  const [showConfetti, setShowConfetti] = useState(false); // Confetti 표시 여부

  useEffect(() => {
    if (!isRunning) return;
    const timer = setInterval(() => {
      setTime((prev: number) => {
        if (prev === 0) {
          setState((now: TimerStateType) => (now === 'focus' ? 'break' : 'focus'));
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

  return { showConfetti, setShowConfetti };
}
