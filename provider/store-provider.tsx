'use client';

import { createContext, type ReactNode, useContext, useRef } from 'react';

import { useStore } from 'zustand';

import { createInfoStore, type InfoStore } from '@/stores/store';

export type InfoStoreApi = ReturnType<typeof createInfoStore>;

export const InfoStoreContext = createContext<InfoStoreApi | undefined>(undefined);

export interface InfoStoreProviderProps {
  children: ReactNode;
}

export const InfoStoreProvider = ({ children }: InfoStoreProviderProps) => {
  const storeRef = useRef<InfoStoreApi>(null);
  if (!storeRef.current) {
    storeRef.current = createInfoStore();
  }

  return <InfoStoreContext.Provider value={storeRef.current}>{children}</InfoStoreContext.Provider>;
};

export const useInfoStore = <T,>(selector: (store: InfoStore) => T): T => {
  const infoStoreContext = useContext(InfoStoreContext);

  if (!infoStoreContext) {
    throw new Error(`useInfoStore must be used within InfoStoreProvider`);
  }

  return useStore(infoStoreContext, selector);
};
