'use client';
import React from 'react';
import type { UseFormRegisterReturn } from 'react-hook-form';

interface InputFieldProps {
  label: string;
  placeholder: string;
  register: UseFormRegisterReturn;
  type: string;
  errorMessage?: string;
  className?: string;
}

export default function InputField({
  label,
  placeholder,
  register,
  type = 'text',
  errorMessage,
  className
}: InputFieldProps) {
  return (
    <div className="flex flex-col">
      {label && <label className="mb-4 font-semibold text-gray500">{label}</label>}
      <input
        type={type}
        placeholder={placeholder}
        {...register}
        autoComplete="off"
        className={`rounded-lg border border-gray200 bg-white px-4 py-3.5 text-gray500 placeholder-gray350 shadow-sm placeholder:text-[16px] placeholder:font-semibold placeholder:leading-[22px] focus:border-main focus:outline-none ${className}`}
      />

      <p className="min-h-[20px] text-sm text-warning">{errorMessage}</p>
    </div>
  );
}
