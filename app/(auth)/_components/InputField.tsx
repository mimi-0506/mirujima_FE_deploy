'use client';
import React, { useEffect, useRef, useState } from 'react';
import type { UseFormRegisterReturn } from 'react-hook-form';

import EyeIcon from '@/components/icons/auth/EyeIcon';

interface InputFieldProps {
  label: string;
  placeholder: string;
  register: UseFormRegisterReturn;
  type?: string;
  errorMessage?: string;
  className?: string;
  triggerValidation?: () => void;
}

export default function InputField({
  label,
  placeholder,
  register,
  type = 'text',
  errorMessage,
  className,
  triggerValidation
}: InputFieldProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const isPasswordField = label === '비밀번호' || label === '비밀번호 확인';

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const { onChange: formOnChange, onBlur: formOnBlur, ...restRegister } = register;
  const handleFocus = () => {
    setIsFocused(true);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      triggerValidation && triggerValidation();
    }, 1000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    formOnChange(e);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    if (isFocused) {
      timeoutRef.current = setTimeout(() => {
        triggerValidation && triggerValidation();
      }, 1000);
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(false);
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    triggerValidation && triggerValidation();
    formOnBlur && formOnBlur(e);
  };

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
          autoComplete="off"
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChange={handleChange}
          {...restRegister}
          className={`w-full rounded-lg border bg-white px-4 py-3.5 pr-10 text-[14px] font-semibold leading-[16px] placeholder-gray350 placeholder:text-[14px] placeholder:font-semibold placeholder:leading-[16px] focus:outline-none md:text-[16px] md:leading-[22px] md:placeholder:text-[16px] md:placeholder:leading-[22px] ${
            errorMessage
              ? 'border-warning text-warning'
              : 'border-gray200 text-gray500 focus:border-gray400'
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
