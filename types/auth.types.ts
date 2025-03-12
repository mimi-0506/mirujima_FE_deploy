import { ISODateString } from './ISODateString.type';
import type { ApiResponse } from './apiResponse.type';

type User = {
  id: number;
  username: string;
  email: string;
  createdAt: ISODateString;
  updatedAt: ISODateString;
  profileImagePath: string;
};

type AuthResult = {
  user: User;
  accessToken: string;
  refreshToken: string;
  expiredAt: string;
};

export type AuthResponse = ApiResponse<AuthResult>;
export type OAuthLoginResponse = ApiResponse<AuthResult>;
