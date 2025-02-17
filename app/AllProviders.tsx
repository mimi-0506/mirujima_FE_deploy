import { Toaster } from 'react-hot-toast';

import { InfoStoreProvider, ModalStoreProvider } from '@/provider/store-provider';

import ModalArea from './ModalArea';
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
          {children}
          <ModalArea />
          <Toaster />
          <div id="modal-portal" />
        </ReactQueryProvider>
      </ModalStoreProvider>
    </InfoStoreProvider>
  );
}
