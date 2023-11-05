import { IApiResponse } from "./api-response.interface";

export interface IErrorApiResponse extends IApiResponse {
  stackTrace: string;
}
