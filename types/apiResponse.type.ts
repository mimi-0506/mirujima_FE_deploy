export type ApiErrorCode = 200 | 400;

export type ApiResponse<T> = {
  success: boolean;
  code: ApiErrorCode;
  message: string;
  result: T;
};
