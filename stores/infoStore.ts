import { createStore } from 'zustand/vanilla';

export type InfoState = {
  id: null | number;
  email: null | string;
  name: null | string;
};

export type InfoActions = {
  setInfo: (newInfo: InfoState) => void;
  logout: () => void;
};

export type InfoStore = InfoState & InfoActions;

export const defaultInitState: InfoState = {
  id: 0,
  email: 'email@gmail.com',
  name: 'Test'
};

export const createInfoStore = (initState: InfoState = defaultInitState) => {
  return createStore<InfoStore>()((set) => ({
    ...initState,
    setInfo: (newInfo) => set((state) => ({ ...newInfo })),
    logout: () => set((state) => ({ id: null, email: null, name: null }))
  }));
};
