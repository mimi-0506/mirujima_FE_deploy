import useResize from '@/hooks/nav/useResize';
import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import useIsClick from './useIsClick';
import { useInfoStore } from '@/provider/store-provider';
import { useDrag } from '@use-gesture/react';
import { animate } from 'motion';

export default function Draggable({
  children,
  isExpanded,
  setIsExpanded
}: {
  children: React.ReactNode;
  isExpanded: boolean;
  setIsExpanded: Dispatch<SetStateAction<boolean>>;
}) {
  const userId = useInfoStore((state) => state.userId);
  const { handleMouseDown, handleMouseUp } = useIsClick(setIsExpanded);
  const { screenSize } = useResize();
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (userId) {
      const savedPosition = localStorage.getItem(`position${userId}`);
      if (savedPosition) setPosition(JSON.parse(savedPosition));
    }
  }, [userId]);

  useDrag(
    ({ offset: [dx, dy], event, cancel }) => {
      if (ref.current) {
        if ('clientX' in event && 'clientY' in event) {
          if (
            event.clientX > screenSize.width - 50 ||
            event.clientY > screenSize.height - 50 ||
            event.clientX < 0 ||
            event.clientY < 0
          )
            cancel();
        }

        animate(ref.current, { x: dx, y: dy }, { duration: 0.001, ease: 'linear' });
        localStorage.setItem(`position${userId}`, JSON.stringify({ x: dx, y: dy }));
      }
    },
    {
      target: ref
    }
  );

  return (
    <div
      style={{ transform: `translate(${position.x}px, ${position.y}px)` }} // 초기 위치 설정
      ref={ref}
      className={`fixed right-6 top-6 z-50 flex cursor-pointer touch-none select-none items-center justify-center transition-all duration-500 ease-in-out ${
        isExpanded ? '-translate-x-[2vw] translate-y-[2vw]' : ''
      }`}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
    >
      {children}
    </div>
  );
}
