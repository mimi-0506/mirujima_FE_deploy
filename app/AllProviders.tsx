import { Toaster } from 'react-hot-toast';

import {
  InfoStoreProvider,
  ModalStoreProvider,
  TodoCreateModalStoreProvider
} from '@/provider/store-provider';

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
        <TodoCreateModalStoreProvider>
          <ReactQueryProvider>
            {children}
            <ModalArea />
            <Toaster />
            <div id="modal-portal" />
          </ReactQueryProvider>
        </TodoCreateModalStoreProvider>
      </ModalStoreProvider>
    </InfoStoreProvider>
  );
}
