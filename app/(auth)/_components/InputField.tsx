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
      {label && <label className="font-semibold text-gray500">{label}</label>}
      <input
        type={type}
        placeholder={placeholder}
        {...register}
        autoComplete="off"
        className={`mb-5 mt-4 rounded-lg border border-gray-200 px-[16px] py-[14px] focus:border-main focus:outline-none focus:ring-1 focus:ring-main ${className}`}
      />

      <p className="min-h-[20px] text-sm text-warning">{errorMessage}</p>
    </div>
  );
}
