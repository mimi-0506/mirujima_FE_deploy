'use client';

import { createContext, type ReactNode, useContext, useRef } from 'react';

import { useStore } from 'zustand';

import { createEmbedStore } from '@/stores/embedStore';
import { createInfoStore } from '@/stores/infoStore';
import { createModalStore, type ModalStore } from '@/stores/modalStore';
import { createTodoCreateModalStore } from '@/stores/todoCreateModalStore';
import type { InfoStore } from '@/types/infoStore.types';
import type { TodoCreateModalStore } from '@/types/todoCreateModal.types';

import type { EmbedStore } from '@/stores/embedStore';

export interface storeProviderProps {
  children: ReactNode;
}

// -------------------------------- InfoStore

export type InfoStoreApi = ReturnType<typeof createInfoStore>;

export const InfoStoreContext = createContext<InfoStoreApi | undefined>(undefined);

export const InfoStoreProvider = ({ children }: storeProviderProps) => {
  const storeRef = useRef<InfoStoreApi>(null);
  if (!storeRef.current) storeRef.current = createInfoStore();

  return <InfoStoreContext.Provider value={storeRef.current}>{children}</InfoStoreContext.Provider>;
};

export const useInfoStore = <T,>(selector: (store: InfoStore) => T): T => {
  const infoStoreContext = useContext(InfoStoreContext);

  if (!infoStoreContext) throw new Error('useInfoStore must be used within InfoStoreProvider');

  return useStore(infoStoreContext, selector);
};

// ----------------------------- ModalStore

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

  if (!modalStoreContext) throw new Error('useModalStore must be used within ModalStoreProvider');

  return useStore(modalStoreContext, selector);
};

// ----------------------------- TodoCreateModalStore

export type TodoCreateModalStoreApi = ReturnType<typeof createTodoCreateModalStore>;

export const TodoCreateModalStoreContext = createContext<TodoCreateModalStoreApi | undefined>(
  undefined
);

export const TodoCreateModalStoreProvider = ({ children }: storeProviderProps) => {
  const storeRef = useRef<TodoCreateModalStoreApi>(null);
  if (!storeRef.current) storeRef.current = createTodoCreateModalStore();

  return (
    <TodoCreateModalStoreContext.Provider value={storeRef.current}>
      {children}
    </TodoCreateModalStoreContext.Provider>
  );
};

export const useTodoCreateModalStore = <T,>(selector: (store: TodoCreateModalStore) => T): T => {
  const todoCreatemodalStoreContext = useContext(TodoCreateModalStoreContext);

  if (!todoCreatemodalStoreContext)
    throw new Error('useModalStore must be used within ModalStoreProvider');

  return useStore(todoCreatemodalStoreContext, selector);
};

// ----------------------------- EmbedStore

export type EmbedStoreApi = ReturnType<typeof createEmbedStore>;

export const EmbedStoreContext = createContext<EmbedStoreApi | undefined>(undefined);

export const EmbedStoreProvider = ({ children }: storeProviderProps) => {
  const storeRef = useRef<EmbedStoreApi>(null);
  if (!storeRef.current) storeRef.current = createEmbedStore();

  return (
    <EmbedStoreContext.Provider value={storeRef.current}>{children}</EmbedStoreContext.Provider>
  );
};

export const useEmbedStore = <T,>(selector: (store: EmbedStore) => T): T => {
  const embedStoreContext = useContext(EmbedStoreContext);

  if (!embedStoreContext) throw new Error('useEmbedStore must be used within EmbedStoreProvider');

  return useStore(embedStoreContext, selector);
};
