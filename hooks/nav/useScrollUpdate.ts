import { useEffect } from 'react';

export default function useScrollUpdate(
  goalListRef: React.RefObject<HTMLElement | null>,
  goals: any[]
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
