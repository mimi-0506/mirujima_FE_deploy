import useResize from '@/hooks/nav/useResize';
import { useEffect, useState } from 'react';

export default function usePosition() {
  const { screenSize } = useResize();
  const [position, setPosition] = useState({
    x: screenSize.width - 100,
    y: 100,
    screenSize: screenSize
  });
  useEffect(() => {
    // 1.절대값 대신 비율로 가져가기
    // 이전 스크린사이즈:현재 스크린사이즈 = 이전 위치:현재 위치
    // 2.screen width가 아닌, body size로 체크할 것.
    // screen으로 체크하는 경우 좌표값이 고정되어 해당 좌표값 이하로 측정된 스크린 크기가 줄어들지 않음.
    setPosition({
      x: (position.x * document.body.clientWidth) / position.screenSize.width,
      y: (position.y * document.body.clientHeight) / position.screenSize.height,
      screenSize: screenSize
    });
  }, [screenSize]);

  useEffect(() => {
    console.log('포지션 변화', position);
  }, [position]);

  return { position, setPosition };
}
