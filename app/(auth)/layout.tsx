import { Toaster } from 'react-hot-toast';

import Header from './_components/Header';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-full overflow-y-auto pb-10">
      <Header />
      <div className="bg-white">
        <Toaster position="top-center" />
        <div className="px-4 md:px-14">
          <div className="mx-auto mt-[50px] w-full max-w-[688px] rounded-2xl border border-solid border-gray200 bg-white p-10 shadow md:mt-[76px]">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
