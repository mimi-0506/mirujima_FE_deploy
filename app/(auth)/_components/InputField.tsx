'use client';
import React from 'react';
import type { UseFormRegisterReturn } from 'react-hook-form';

interface InputFieldProps {
  label: string;
  placeholder: string;
  register: UseFormRegisterReturn;
  type: string;
  errorMessage?: string;
}

export default function InputField({
  label,
  placeholder,
  register,
  type = 'text',
  errorMessage
}: InputFieldProps) {
  return (
    <div className="flex flex-col">
      {label && <label className="font-semibold">{label}</label>}
      <input
        type={type}
        placeholder={placeholder}
        {...register}
        autoComplete="off"
        className="rounded-md border bg-white px-3 py-2 focus:border-orange-400 focus:outline-none"
      />

      <p className="min-h-[20px] text-sm text-red-500">{errorMessage}</p>
    </div>
  );
}
