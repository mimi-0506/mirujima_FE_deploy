import NavBar from '@/components/navBar';

import ModalArea from './ModalArea';
import Logo from '../public/images/logo/mirujima-logo.svg';

export default function Home() {
  return (
    <>
      <ModalArea />
      <div className="grid min-h-screen items-center justify-items-center">
        <NavBar />
        <Logo />
      </div>
    </>
  );
}
