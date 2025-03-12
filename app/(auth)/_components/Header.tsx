import Image from 'next/image';
import Link from 'next/link';

export default function Header() {
  return (
    <header className="h-[74px] border-b border-gray200 bg-white">
      <div className="mx-auto flex h-full w-full max-w-[1280px] items-center justify-between px-[10px] md:px-6">
        <Link href={'/'}>
          <Image
            src="/images/logo/mirujima-logo-full.png"
            alt="미루지마 로고"
            height={19}
            width={108}
            className="h-auto w-[108px] cursor-pointer"
          />
        </Link>

        <div className="flex items-center">
          <ul className="flex items-center py-[10px]">
            <li>
              <Link href={'/login'} className="px-4 py-4 text-button2 text-gray500 md:text-head3">
                로그인
              </Link>
            </li>
            <li>
              <Link href={'/signup'} className="px-4 py-4 text-button2 text-main md:text-head3">
                회원가입
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
}
