import { ISODateString } from './ISODateString.type';

type User = {
  id: number;
  username: string;
  email: string;
  createdAt: ISODateString;
  updatedAt: ISODateString;
};

type AuthResponse<T extends User = User> = {
  success: boolean;
  code: number;
  message: string;
  result: {
    user: T;
    accessToken: string;
    refreshToken: string;
    expiredAt: string;
  } | null;
};

export type GoogleLoginResponse = AuthResponse<User & { profileImagePath: string }>;

export type KakaoLoginResponse = AuthResponse<User>;
