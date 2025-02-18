import { Toaster } from 'react-hot-toast';

import Header from './_components/Header';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-full overflow-y-auto pb-10">
      <Header />
      <div className="bg-white">
        <Toaster position="top-center" />
        <div className="desktop:px-14 px-4 md:px-8">
          <div className="desktop:mt-[76px] mx-auto mt-[50px] w-full max-w-[688px] rounded-2xl border border-solid border-gray200 px-6 py-10 shadow md:mt-[50px] md:px-10">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
