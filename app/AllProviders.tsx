import { Toaster } from 'react-hot-toast';

import NavBar from '@/components/navBar';
import { InfoStoreProvider, ModalStoreProvider } from '@/provider/store-provider';

import ReactQueryProvider from '../hooks/useReactQuery';

export default function AllProviders({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <InfoStoreProvider>
      <ModalStoreProvider>
        <ReactQueryProvider>
          <NavBar />
          {children}
          <Toaster />
        </ReactQueryProvider>
      </ModalStoreProvider>
    </InfoStoreProvider>
  );
}
