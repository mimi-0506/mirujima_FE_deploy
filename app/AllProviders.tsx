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
        <ReactQueryProvider> {children}</ReactQueryProvider>
      </ModalStoreProvider>
    </InfoStoreProvider>
  );
}
