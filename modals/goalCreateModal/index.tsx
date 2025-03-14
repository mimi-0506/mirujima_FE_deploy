import { useCallback, useRef, useState } from 'react';

import { debounce } from 'lodash';

import useSetNewGoal from '@/hooks/nav/useSetNewGoal';
import { useModalStore } from '@/provider/store-provider';

import CloseButton from '../CloseButton';
import Overlay from '../Overlay';

export default function GoalCreateModal() {
  const setIsGoalCreateModalOpen = useModalStore((state) => state.setIsGoalCreateModalOpen);
  const { mutateAsync } = useSetNewGoal();
  const [textValid, setTextValid] = useState(false);
  const [dateValid, setDateValid] = useState(false);

  const textRef = useRef<HTMLInputElement>(null);
  const dateRef = useRef<HTMLInputElement>(null);

  const handleTextValidCheck = useCallback(
    debounce((e: React.ChangeEvent<HTMLInputElement>) => {
      setTextValid(e.target.value.trim() !== '');
    }, 50),
    []
  );

  const handleDateValidCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value) setDateValid(true);
    else setDateValid(false);
  };

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
    if (e.key === 'Enter' && textValid && dateValid) handleGoalCreat();
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
          onChange={handleTextValidCheck}
          className="mb-[28px] mt-[25px] box-border h-[50px] w-full rounded-lg border border-gray200 px-[16px] py-[14px] focus:outline-main"
          placeholder="목표를 적어주세요"
          onKeyDown={handleKeyPress}
        />
        <h1 className="text-[20px]">완료 날짜</h1>
        <input
          type="date"
          ref={dateRef}
          onChange={handleDateValidCheck}
          className="mb-[28px] mt-[25px] box-border h-[50px] w-full rounded-lg border border-gray200 px-[16px] py-[14px] focus:outline-main"
        />
        <button
          className={`${
            textValid && dateValid ? 'bg-main' : 'cursor-not-allowed bg-gray-400'
          } rounded px-4 py-2 font-bold text-white active:bg-pressed`}
          onClick={handleGoalCreat}
        >
          생성하기
        </button>
      </div>
    </Overlay>
  );
}
