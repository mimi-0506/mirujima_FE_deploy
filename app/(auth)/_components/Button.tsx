'use client';
import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit';
  className?: string;
}

export default function Button({
  children,
  onClick,
  type = 'button',
  className = ''
}: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`h-[40px] w-full rounded-lg px-4 py-3 text-[14px] font-medium leading-[16px] md:h-[50px] md:text-[16px] md:font-semibold md:leading-[22px] ${className}`}
    >
      {children}
    </button>
  );
}
