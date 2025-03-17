import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useLoginMutation } from '@/hooks/auth/useLoginMutation';
import { CheckedIcon } from '@/app/(workspace)/todoList/_components/CheckedIcon';
import Button from '../_components/Button';
import InputField from '../_components/InputField';
const loginSchema = z.object({
  email: z.string().email('올바른 이메일을 입력해주세요.'),
  password: z.string().min(8, '비밀번호는 최소 8자 이상이어야 합니다.')
});

type LoginFormData = z.infer<typeof loginSchema>;

interface LoginFormProps {
  onSignup: () => void;
}

export default function LoginForm({ onSignup }: LoginFormProps) {
  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors }
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: 'onSubmit'
  });

  const { mutate: loginMutate, isError, error } = useLoginMutation();
  const [isChecked, setIsChecked] = useState(false);

  const onSubmit = async (data: LoginFormData) => {
    loginMutate({ formData: data, isAutoLogin: isChecked });
  };
  const serverErrorMessage = isError && error instanceof Error ? error.message : null;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
      <InputField
        label="이메일"
        placeholder="이메일"
        register={register('email')}
        type="email"
        errorMessage={errors.email?.message}
        triggerValidation={() => trigger('email')}
      />
      <InputField
        label="비밀번호"
        placeholder="비밀번호"
        register={register('password')}
        type="password"
        errorMessage={errors.password?.message}
        triggerValidation={() => trigger('password')}
      />
      {serverErrorMessage && <p className="text-sm text-warning">{serverErrorMessage}</p>}
      <div className="my-3 flex items-center gap-2">
        <div className="relative flex cursor-pointer">
          <input
            id="auto-login"
            type="checkbox"
            checked={isChecked}
            onChange={() => setIsChecked((prev) => !prev)}
            className="peer h-[18px] w-[18px] cursor-pointer appearance-none rounded-[6px] border border-gray200 transition-all checked:border-main checked:bg-main"
          />
          <span className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 peer-checked:opacity-100">
            <CheckedIcon />
          </span>
        </div>
        <label htmlFor="auto-login" className="text-[14px] font-medium text-gray500">
          자동 로그인
        </label>
      </div>
      <Button type="submit" className="bg-main text-white">
        로그인
      </Button>
      <Button
        type="button"
        onClick={onSignup}
        className="mt-3 border border-gray-300 bg-white text-gray500"
      >
        회원가입
      </Button>
    </form>
  );
}
