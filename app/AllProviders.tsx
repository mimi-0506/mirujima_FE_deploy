import { Toaster } from 'react-hot-toast';

// import { GoogleOAuthProvider } from '@react-oauth/google';

import {
  EmbedStoreProvider,
  InfoStoreProvider,
  ModalStoreProvider,
  TodoCreateModalStoreProvider
} from '@/provider/store-provider';

import ModalArea from './ModalArea';
import ReactQueryProvider from '../hooks/useReactQuery';
// const GOOGLE_CLIENT_ID = process.env.NEXT_GOOGLE_CLIENT_ID;
export default function AllProviders({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID ?? ''}>
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
    // </GoogleOAuthProvider>
  );
}
