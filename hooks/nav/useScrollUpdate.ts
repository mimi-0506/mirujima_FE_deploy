import { useEffect } from 'react';

export default function useScrollUpdate<T>(
  goalListRef: React.RefObject<HTMLElement | null>,
  goals: T[]
) {
  useEffect(() => {
    const scrollToBottom = () => {
      if (goalListRef.current) {
        goalListRef.current.scrollTo({
          top: goalListRef.current.scrollHeight,
          behavior: 'smooth'
        });
      }
    };

    const timeoutId = setTimeout(scrollToBottom, 50);

    return () => clearTimeout(timeoutId);
  }, [goals]);
}
