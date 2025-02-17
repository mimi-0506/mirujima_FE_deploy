import { createStore } from 'zustand/vanilla';

export type InfoState = {
  id: number | null;
  email: string | null;
  name: string | null;
};

export type InfoActions = {
  setInfo: (newInfo: InfoState) => void;
  logout: () => void;
  restoreUser: () => void;
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
    setInfo: (newInfo) => set(() => ({ ...newInfo })),
    logout: () => set(() => ({ ...defaultInitState })),
    restoreUser: () => {
      const cookies = document.cookie.split('; ');
      const userCookie = cookies.find((row) => row.startsWith('user='));
      if (userCookie) {
        const userData = JSON.parse(decodeURIComponent(userCookie.split('=')[1]));
        set(() => ({
          id: userData.id,
          email: userData.email,
          name: userData.username
        }));
      }
    }
  }));
};
