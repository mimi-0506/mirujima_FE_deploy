import { ISODateString } from './ISODateString.type';

type User = {
  id: number;
  username: string;
  email: string;
  createdAt: ISODateString;
  updatedAt: ISODateString;
  profileImagePath: string;
};

type AuthResponse = {
  success: boolean;
  code: number;
  message: string;
  result: {
    user: User;
    accessToken: string;
    refreshToken: string;
    expiredAt: string;
  } | null;
};

export type OAuthLoginResponse = AuthResponse;
