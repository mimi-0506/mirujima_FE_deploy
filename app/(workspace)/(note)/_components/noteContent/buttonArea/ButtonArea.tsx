import React from 'react';

interface Props {
  isEdit: boolean;
  isValid: boolean;
  onSaveTempNote: () => void;
}

export default function ButtonArea({ isEdit, isValid, onSaveTempNote }: Props) {
  return (
    <div className="flex w-full items-center justify-between">
      <h2 className="text-base leading-[28px] text-gray500 md:text-[22px]">
        {isEdit ? '노트 수정' : '노트 작성'}
      </h2>
      <div className="flex gap-2">
        <button
          type="button"
          onClick={onSaveTempNote}
          name="임시저장 버튼"
          aria-label="노트 임시저장"
          className="color-animate h-[40px] w-[80px] rounded-lg border border-gray200 bg-white text-[14px] font-semibold text-gray350 hover:bg-whitehover md:h-[50px] md:w-[88px]"
        >
          임시 저장
        </button>
        <button
          type="submit"
          name="작성완료 버튼"
          aria-label="노트 작성완료"
          aria-disabled={!isValid}
          disabled={!isValid}
          className="color-animate h-[40px] w-[80px] rounded-lg bg-solid text-[14px] font-semibold text-main hover:bg-solidhover disabled:bg-Cgray disabled:text-gray350 md:h-[50px] md:w-[88px]"
        >
          {isEdit ? '수정 완료' : '작성 완료'}
        </button>
      </div>
    </div>
  );
}
