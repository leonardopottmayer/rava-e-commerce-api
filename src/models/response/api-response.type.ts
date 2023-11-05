export type ApiResponse<TResult> = {
  message: string;
  result: TResult;
  succes: boolean;
};
