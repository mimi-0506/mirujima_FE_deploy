import { createStore } from 'zustand/vanilla';

export type InfoState = {
  userId: number | null;
  email: string | null;
  name: string | null;
  profileImage: string | null;
};

export type InfoActions = {
  setInfo: (newInfo: Partial<InfoState>) => void;
  logout: () => void;
  restoreUser: () => void;
};

export type InfoStore = InfoState & InfoActions;

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
    logout: () => set(() => ({ ...defaultInitState })),
    restoreUser: () => {
      const cookies = document.cookie.split('; ');
      const userCookie = cookies.find((row) => row.startsWith('user='));
      if (userCookie) {
        const userData = JSON.parse(decodeURIComponent(userCookie.split('=')[1]));
        set(() => ({
          userId: userData.id,
          email: userData.email,
          name: userData.username,
          profileImage: userData.profileImagePath
        }));
      }
    }
  }));
};
