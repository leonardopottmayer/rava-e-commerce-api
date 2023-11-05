import { IApiResponse } from "./api-response.interface";

export interface ISuccessApiResponse<TResult> extends IApiResponse {
  result: TResult;
}
