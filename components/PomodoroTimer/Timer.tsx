import { BREAK_TIME, FOCUS_TIME } from '@/constant/numbers';
import { TimerStateType } from '@/types/pomodoro.type';
import { Dispatch, SetStateAction } from 'react';

export default function Timer({
  state,
  setTime,
  time,
  setIsRunning,
  isRunning
}: {
  state: TimerStateType;
  setTime: Dispatch<SetStateAction<number>>;
  time: number;
  setIsRunning: Dispatch<SetStateAction<boolean>>;
  isRunning: boolean;
}) {
  const handleStartPause = () => {
    setIsRunning((prev: boolean) => !prev);
  };

  const handleReset = () => {
    setTime(state === 'focus' ? FOCUS_TIME : BREAK_TIME);
    setIsRunning(false);
  };

  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      <h1 className="mb-5 text-3xl text-white">{state === 'focus' ? 'Focus' : 'Break'}</h1>

      <h2 className="py-5 text-2xl font-bold text-white">
        {`${Math.floor(time / 60)}:${String(time % 60).padStart(2, '0')}`}
      </h2>

      <div className="mt-4 flex gap-4">
        <button
          onClick={handleStartPause}
          onTouchStart={handleStartPause}
          className="rounded bg-blue-500 px-4 py-2 text-white"
        >
          {isRunning ? 'Pause' : 'Start'}
        </button>
        <button
          onClick={handleReset}
          onTouchStart={handleReset}
          className="rounded bg-gray-500 px-4 py-2 text-white"
        >
          Reset
        </button>
      </div>
    </div>
  );
}
