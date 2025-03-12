import { Dispatch, SetStateAction, useState } from 'react';
import useResize from '../nav/useResize';
import { DraggableEvent, DraggableEventHandler } from 'react-draggable'; // 타입 추가

export default function useIsDrag(
  setIsExpanded: Dispatch<SetStateAction<boolean>>,
  setPosition: Dispatch<
    SetStateAction<{ x: number; y: number; screenSize: { width: number; height: number } }>
  >
) {
  const { screenSize } = useResize();
  const [dragStart, setDragStart] = useState<{
    x: number;
    y: number;
    screenSize: { width: number; height: number };
  } | null>(null);

  const handleDragStart: DraggableEventHandler = (e: DraggableEvent) => {
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

    setDragStart({ x: clientX, y: clientY, screenSize: screenSize });
  };

  const handleDragStop: DraggableEventHandler = (e: DraggableEvent) => {
    const clientX = 'changedTouches' in e ? e.changedTouches[0].clientX : e.clientX;
    const clientY = 'changedTouches' in e ? e.changedTouches[0].clientY : e.clientY;

    if (dragStart) {
      setPosition((prev) => ({
        x: Math.min(clientX + 55, screenSize.width),
        y: Math.min(clientY - 55, screenSize.height),
        screenSize: prev.screenSize
      }));
    }
  };

  return { handleDragStart, handleDragStop };
}
