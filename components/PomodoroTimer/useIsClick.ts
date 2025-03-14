import { Dispatch, SetStateAction, useState } from 'react';

const CLICK_SECONDS = 200;

export default function useIsClick(setIsExpanded: Dispatch<SetStateAction<boolean>>) {
  const [clickStartTime, setClickStartTime] = useState(0);
  const handleMouseDown = () => {
    setClickStartTime(Date.now());
  };

  const handleMouseUp = () => {
    const clickDuration = Date.now() - clickStartTime;
    if (clickDuration <= CLICK_SECONDS) setIsExpanded((prev) => !prev);
  };

  return { handleMouseDown, handleMouseUp };
}
