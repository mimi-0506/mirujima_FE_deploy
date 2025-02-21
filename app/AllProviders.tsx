import { Toaster } from 'react-hot-toast';

import {
  InfoStoreProvider,
  ModalStoreProvider,
  TodoCreateModalStoreProvider
} from '@/provider/store-provider';
import { GoogleOAuthProvider } from '@react-oauth/google';
import ModalArea from './ModalArea';
import ReactQueryProvider from '../hooks/useReactQuery';
const GOOGLE_CLIENT_ID = process.env.NEXT_GOOGLE_CLIENT_ID;
export default function AllProviders({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID ?? ''}>
      <InfoStoreProvider>
        <ModalStoreProvider>
          <TodoCreateModalStoreProvider>
            <ReactQueryProvider>
              {children}
              <ModalArea />
              <Toaster
                containerStyle={{
                  bottom: 100
                }}
              />
              <div id="modal-portal" />
            </ReactQueryProvider>
          </TodoCreateModalStoreProvider>
        </ModalStoreProvider>
      </InfoStoreProvider>
    </GoogleOAuthProvider>
  );
}
