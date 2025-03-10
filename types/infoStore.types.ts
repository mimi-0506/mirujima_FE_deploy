export type InfoState = {
  userId: number | null;
  email: string | null;
  name: string | null;
  profileImage: string | null;
};

export type InfoActions = {
  setInfo: (newInfo: Partial<InfoState>) => void;
  logout: () => void;
};

export type InfoStore = InfoState & InfoActions;
