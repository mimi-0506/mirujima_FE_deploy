import { createStore } from 'zustand';

export type EmbedState = {
  isEmbedContentOpen: boolean;
  embedUrl: string;
};

export type EmbedActions = {
  setEmbedContentOpen: (now: boolean) => void;
  setEmbedUrl: (url: string) => void;
};

export type EmbedStore = { state: EmbedState; actions: EmbedActions };

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
