'use client';

import { createContext, type ReactNode, useContext, useRef } from 'react';

import { useStore } from 'zustand';

import { createInfoStore, type InfoStore } from '@/stores/infoStore';
import { createModalStore, type ModalStore } from '@/stores/modalStore';

export interface storeProviderProps {
  children: ReactNode;
}

//--------------------------------

export type InfoStoreApi = ReturnType<typeof createInfoStore>;

export const InfoStoreContext = createContext<InfoStoreApi | undefined>(undefined);

export const InfoStoreProvider = ({ children }: storeProviderProps) => {
  const storeRef = useRef<InfoStoreApi>(null);
  if (!storeRef.current) storeRef.current = createInfoStore();

  return <InfoStoreContext.Provider value={storeRef.current}>{children}</InfoStoreContext.Provider>;
};

export const useInfoStore = <T,>(selector: (store: InfoStore) => T): T => {
  const infoStoreContext = useContext(InfoStoreContext);

  if (!infoStoreContext) throw new Error(`useInfoStore must be used within InfoStoreProvider`);

  return useStore(infoStoreContext, selector);
};

//-----------------------------

export type ModalStoreApi = ReturnType<typeof createModalStore>;

export const ModalStoreContext = createContext<ModalStoreApi | undefined>(undefined);

export const ModalStoreProvider = ({ children }: storeProviderProps) => {
  const storeRef = useRef<ModalStoreApi>(null);
  if (!storeRef.current) storeRef.current = createModalStore();

  return (
    <ModalStoreContext.Provider value={storeRef.current}>{children}</ModalStoreContext.Provider>
  );
};

export const useModalStore = <T,>(selector: (store: ModalStore) => T): T => {
  const modalStoreContext = useContext(ModalStoreContext);

  if (!modalStoreContext) throw new Error(`useModalStore must be used within ModalStoreProvider`);

  return useStore(modalStoreContext, selector);
};

//-----------------------------

export type TodoCreateModalStoreApi = ReturnType<typeof createModalStore>;

export const TodoCreateModalStoreContext = createContext<ModalStoreApi | undefined>(undefined);

export const TodoCreateModalStoreProvider = ({ children }: storeProviderProps) => {
  const storeRef = useRef<ModalStoreApi>(null);
  if (!storeRef.current) storeRef.current = createModalStore();

  return (
    <TodoCreateModalStoreContext.Provider value={storeRef.current}>
      {children}
    </TodoCreateModalStoreContext.Provider>
  );
};

export const useTodoCreateModalStore = <T,>(selector: (store: ModalStore) => T): T => {
  const todoCreatemodalStoreContext = useContext(TodoCreateModalStoreContext);

  if (!todoCreatemodalStoreContext)
    throw new Error(`useModalStore must be used within ModalStoreProvider`);

  return useStore(todoCreatemodalStoreContext, selector);
};
