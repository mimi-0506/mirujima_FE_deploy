'use client';
import React, { useState } from 'react';
import type { UseFormRegisterReturn } from 'react-hook-form';

import EyeIcon from '@/components/icons/auth/EyeIcon';

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
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const isPasswordField = label === '비밀번호' || label === '비밀번호 확인';

  return (
    <div className="flex flex-col">
      {label && (
        <label className="mb-4 text-[17px] font-semibold leading-[22px] text-gray500">
          {label}
        </label>
      )}
      <div className="relative">
        <input
          type={isPasswordField && showPassword ? 'text' : type}
          placeholder={placeholder}
          {...register}
          autoComplete="off"
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className={`w-full rounded-lg border bg-white px-4 py-3 pr-10 font-semibold placeholder-gray350 placeholder:text-[16px] placeholder:font-semibold placeholder:leading-[22px] focus:outline-none ${
            errorMessage ? 'border-warning text-warning' : 'border-gray200 text-gray500'
          } ${className}`}
        />
        {isPasswordField && (
          <button
            type="button"
            className="absolute right-[13px] top-1/2 h-6 w-6 -translate-y-1/2 bg-transparent"
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => setShowPassword((prev) => !prev)}
          >
            <EyeIcon showPassword={showPassword} isFocused={isFocused} />
          </button>
        )}
      </div>

      <p
        className="min-h-[20px] pl-[10px] pt-1 text-[12px] font-medium leading-[16px] text-warning"
        style={{ visibility: errorMessage ? 'visible' : 'hidden' }}
      >
        {errorMessage || ' '}
      </p>
    </div>
  );
}
