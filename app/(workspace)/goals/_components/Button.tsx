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
      className={`h-[50px] w-[119px] rounded-lg bg-Cgray px-4 py-3 text-base font-semibold text-gray350 ${className}`}
    >
      {children}
    </button>
  );
}
