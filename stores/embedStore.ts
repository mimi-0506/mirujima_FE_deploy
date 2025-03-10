import { createStore } from 'zustand';
import type { EmbedState, EmbedStore } from '@/types/embedStore.types';

export const defaultInitState: EmbedState = {
  isEmbedContentOpen: false,
  embedUrl: ''
};

export const createEmbedStore = (initState: EmbedState = defaultInitState) => {
  return createStore<EmbedStore>()((set) => ({
    state: initState,
    actions: {
      setEmbedContentOpen: (now) =>
        set((store) => ({ state: { ...store.state, isEmbedContentOpen: now } })),
      setEmbedUrl: (url) => set((store) => ({ state: { ...store.state, embedUrl: url } }))
    }
  }));
};

export type { EmbedStore };
