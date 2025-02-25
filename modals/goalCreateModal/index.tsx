import { useCallback, useRef, useState } from 'react';

import { debounce } from 'lodash';

import useSetNewGoal from '@/hooks/nav/useSetNewGoal';
import { useModalStore } from '@/provider/store-provider';

import CloseButton from '../CloseButton';
import Overlay from '../Overlay';

export default function GoalCreateModal() {
  const { setIsGoalCreateModalOpen } = useModalStore((state) => state);
  const { mutateAsync } = useSetNewGoal();
  const [valid, setValid] = useState(false);

  const textRef = useRef<HTMLInputElement>(null);
  const dateRef = useRef<HTMLInputElement>(null);

  const handleValidCheck = useCallback(
    debounce((e: React.ChangeEvent<HTMLInputElement>) => {
      setValid(e.target.value.trim() !== '');
    }, 50),
    []
  );

  const handleGoalCreat = async () => {
    if (textRef.current && dateRef.current) {
      const nowGoal = textRef.current.value;
      const endDate = dateRef.current.value;

      await mutateAsync({ nowGoal, endDate });
      setIsGoalCreateModalOpen(false);
    }
  };

  const handleClose = () => {
    setIsGoalCreateModalOpen(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') handleGoalCreat();
  };

  return (
    <Overlay onClick={handleClose}>
      <div
        className="box-border flex w-[520px] flex-col rounded-xl bg-white p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between text-gray500">
          <h1 className="text-[20px]">목표 생성</h1> <CloseButton handleClose={handleClose} />
        </div>
        <input
          ref={textRef}
          onChange={handleValidCheck}
          className="mb-[28px] mt-[25px] box-border h-[50px] w-full rounded-lg border border-gray200 px-[16px] py-[14px]"
          placeholder="목표를 적어주세요"
          onKeyDown={handleKeyPress}
        />
        완료날짜
        <input type="date" ref={dateRef} />
        <button
          className={`${
            valid ? 'bg-main' : 'cursor-not-allowed bg-gray-400'
          } rounded px-4 py-2 font-bold text-white active:bg-pressed`}
          onClick={handleGoalCreat}
        >
          생성하기
        </button>
      </div>
    </Overlay>
  );
}
