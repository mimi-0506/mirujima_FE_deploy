import toast from 'react-hot-toast';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { useInfoStore } from '@/provider/store-provider';

export default function Info() {
  const { id, email, name } = useInfoStore((state) => state);
  const router = useRouter();

  const handleLogoutClick = () => {
    toast.success('로그아웃 되었습니다!', { duration: 2000 });
    router.push('/logout');
  };

  return (
    <div className="my-6 flex gap-[16px]">
      <div className="relative flex h-[64px] w-[64px] items-center justify-center rounded-[12.8px] border border-gray-200">
        <Image
          src={'/images/temp.png'} //임시파일. 토마토 분리되면 그걸로 교체
          width={64}
          height={64}
          alt={'profile image'}
        />
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
