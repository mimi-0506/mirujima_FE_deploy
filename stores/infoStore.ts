import { createStore } from 'zustand/vanilla';
import type { InfoStore, InfoState } from '@/types/infoStore.types';

export const defaultInitState: InfoState = {
  userId: null,
  email: null,
  name: null,
  profileImage: null
};

export const createInfoStore = (initState: InfoState = defaultInitState) => {
  return createStore<InfoStore>()((set) => ({
    ...initState,
    setInfo: (newInfo) => set((state) => ({ ...state, ...newInfo })),
    logout: () => set(() => ({ ...defaultInitState }))
  }));
};
