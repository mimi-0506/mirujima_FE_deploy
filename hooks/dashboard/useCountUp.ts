import { useEffect, useState } from 'react';

const easeOutExpo = (n: number) => {
  // 숫자 1에 가까워질수록 속도가 줄어듦
  return n === 1 ? 1 : 1 - Math.pow(2, -10 * n);
};

export const useCountUp = (completionNumber: number, duration: number) => {
  const [count, setCount] = useState(0);
  const frameRate = 1000 / 60;
  const totalFrame = Math.round(duration / frameRate);

  useEffect(() => {
    let currentCountNumber = 0;

    const counter = setInterval(() => {
      const progressRate = easeOutExpo(++currentCountNumber / totalFrame);

      setCount(Math.round(completionNumber * progressRate));

      if (progressRate === 1) {
        clearInterval(counter);
      }
    }, frameRate);

    return () => clearInterval(counter);
  }, [completionNumber, frameRate, totalFrame]);

  return count;
};
