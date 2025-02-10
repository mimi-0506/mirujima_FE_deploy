import { useStore } from 'zustand';
import { createStore } from 'zustand/vanilla';

export type InfoState = {
  id: number | null;
  email: string | null;
  name: string | null;
};

export type InfoActions = {
  setInfo: (newInfo: InfoState) => void;
};

export type InfoStore = InfoState & InfoActions;

export const defaultInitState: InfoState = {
  id: null,
  email: null,
  name: null
};

export const createInfoStore = (initState: InfoState = defaultInitState) => {
  return createStore<InfoStore>()((set) => ({
    ...initState,
    setInfo: (newInfo) => set(() => ({ ...newInfo }))
  }));
};
export const infoStore = createInfoStore();
export function useInfoStore() {
  return useStore(infoStore);
}
