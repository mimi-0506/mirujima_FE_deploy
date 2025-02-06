'use client';
import { useState } from 'react';

export default function NavBar() {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const CloseButton = () => {
    return (
      <button
        onClick={() => {
          setIsOpen((x) => !x);
        }}
      >
        닫기
      </button>
    );
  };

  return isOpen ? (
    <div className="absolute left-0 flex h-screen w-[50px] flex-col border border-black">
      <CloseButton />
    </div>
  ) : (
    <div className="absolute left-0 flex h-screen w-[300px] flex-col border border-black">
      <CloseButton />
    </div>
  );
}
