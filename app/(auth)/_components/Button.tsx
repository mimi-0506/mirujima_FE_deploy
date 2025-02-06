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
      className={`w-full rounded-md bg-orange-400 py-2 text-white ${className}`}
    >
      {children}
    </button>
  );
}
