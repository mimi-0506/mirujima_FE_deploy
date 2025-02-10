import Image from 'next/image';

import NavBar from '@/components/navBar';

import ModalArea from './ModalArea';

export default function Home() {
  return (
    <>
      <ModalArea />
      <div className="grid min-h-screen items-center justify-items-center">
        <NavBar />
        <Image src="/images/logo/mirujima-logo-full.png" width="120" height="20" alt="logo" />
      </div>
    </>
  );
}
