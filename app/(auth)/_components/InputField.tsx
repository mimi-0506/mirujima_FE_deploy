'use client';
import React from 'react';
import type { UseFormRegisterReturn } from 'react-hook-form';

interface InputFieldProps {
  label: string;
  placeholder: string;
  register: UseFormRegisterReturn;
  type?: string;
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
      {label && (
        <label className="mb-4 text-[17px] font-semibold leading-[22px] text-gray500">
          {label}
        </label>
      )}
      <input
        type={type}
        placeholder={placeholder}
        {...register}
        autoComplete="off"
        className={`rounded-lg border bg-white px-4 py-3 font-semibold placeholder-gray350 placeholder:text-[16px] placeholder:font-semibold placeholder:leading-[22px] focus:outline-none ${errorMessage ? 'border-warning text-warning' : 'border-gray200 text-gray500'} ${className}`}
      />
      <p
        className="min-h-[20px] pl-[10px] pt-1 text-[12px] font-medium leading-[16px] text-warning"
        style={{ visibility: errorMessage ? 'visible' : 'hidden' }}
      >
        {errorMessage || ' '}
      </p>
    </div>
  );
}
