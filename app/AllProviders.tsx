import { Toaster } from 'react-hot-toast';

import {
  EmbedStoreProvider,
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
          <EmbedStoreProvider>
            <ReactQueryProvider>
              {children}
              <ModalArea />
              <Toaster
                containerStyle={{
                  bottom: 100
                }}
              />
            </ReactQueryProvider>
          </EmbedStoreProvider>
        </TodoCreateModalStoreProvider>
      </ModalStoreProvider>
    </InfoStoreProvider>
  );
}
