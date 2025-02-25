import toast from 'react-hot-toast';

import { useRouter } from 'next/navigation';

import { useInfoStore, useModalStore } from '@/provider/store-provider';

import ProfileImage from './ProfileImage';

export default function Info() {
  const { email, name } = useInfoStore((state) => state);
  const { setIsLoading } = useModalStore((state) => state);

  const router = useRouter();

  const handleLogoutClick = () => {
    setIsLoading(true);
    toast.success('로그아웃 되었습니다!', { duration: 2000 });
    router.push('/logout');
  };

  return (
    <div className="my-6 flex gap-[16px]">
      <div className="relative flex h-[64px] w-[64px] items-center justify-center rounded-[12.8px] border border-gray-200">
        <ProfileImage />
      </div>
      <div>
        <div>{name}</div>
        <div className="text-gray400">{email}</div>

        <button className="text-gray350" onClick={handleLogoutClick}>
          로그아웃
        </button>
      </div>
    </div>
  );
}
