import NavBar from '@/components/navBar';

import Logo from '../public/images/logo/mirujima-logo.svg';

export default function Home() {
  return (
    <div className="grid min-h-screen items-center justify-items-center">
      <NavBar />
      <Logo />
    </div>
  );
}
