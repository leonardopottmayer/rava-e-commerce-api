import { IErrorApiResponse } from "../models/response/error-api-response.interface";
import { ISuccessApiResponse } from "../models/response/success-api-response.interface";
import { Response } from "express";

export class ResponseWriter {
  constructor() {}

  static success<TResult>(
    res: Response,
    message: string,
    result: TResult,
    statusCode: number
  ): Response {
    const response: ISuccessApiResponse<TResult> = {
      message: message,
      result: result,
      success: true,
      statusCode: statusCode,
    };

    return res.status(statusCode).json(response);
  }
  static error(
    res: Response,
    message: string,
    stackTrace: string,
    statusCode: number
  ): Response {
    const response: IErrorApiResponse = {
      message: message,
      success: false,
      statusCode: statusCode,
      stackTrace: stackTrace,
    };

    return res.status(statusCode).json(response);
  }
}
