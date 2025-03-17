import useResize from '@/hooks/nav/useResize';
import { useInfoStore } from '@/provider/store-provider';
import { useEffect, useRef, useState } from 'react';

type savedPositionType = { xPercentage: number; yPercentage: number };

export default function usePosition() {
  const userId = useInfoStore((state) => state.userId);
  const { screenSize } = useResize();
  const testRef = useRef(false);

  const getSavedPosition = (screenSize: { width: number; height: number }) => {
    const saved = localStorage.getItem(`position${userId}`);

    testRef.current = true;
    if (saved) {
      const savedPosition: savedPositionType = JSON.parse(saved);
      console.log('첫 데이터 가져옴', savedPosition);

      return {
        x: savedPosition.xPercentage / screenSize.width,
        y: savedPosition.yPercentage / screenSize.height,
        screenSize: screenSize
      };
    } else {
      console.log('첫 데이터 없음');
      return {
        x: screenSize.width - 100,
        y: 100,
        screenSize: screenSize
      };
    }
  };

  const firstData = getSavedPosition(screenSize);

  const [position, setPosition] = useState(firstData);

  useEffect(() => {
    // 1.절대값 대신 비율로 가져가기
    // 이전 스크린사이즈:현재 스크린사이즈 = 이전 위치:현재 위치
    // 2.screen width가 아닌, body size로 체크할 것.
    // screen으로 체크하는 경우 좌표값이 고정되어 해당 좌표값 이하로 측정된 스크린 크기가 줄어들지 않음.
    setPosition({
      x: (position.x * document.body.clientWidth) / screenSize.width,
      y: (position.y * document.body.clientHeight) / screenSize.height,
      screenSize: screenSize
    });
  }, [screenSize]);

  useEffect(() => {
    console.log(position);

    if (userId && testRef.current) {
      const newPosition = {
        xPercentage: Math.round(position.x * document.body.clientWidth),
        yPercentage: Math.round(position.y * document.body.clientHeight)
      };
      console.log('첫 데이터 가져왔으므로 데이터 갱신', newPosition);
      localStorage.setItem(`position${userId}`, JSON.stringify(newPosition));
    }
  }, [position]);

  return { position, setPosition };
}
