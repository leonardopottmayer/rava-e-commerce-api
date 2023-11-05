import { NextFunction, Request, Response } from "express";
import { AppException } from "../models/exception/app.exception";
import { ResponseWriter } from "../utils/response-writer";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { getDbErrorMessage } from "../utils/db-error-message-getter";

type ErrorResponseData = {
  message: string;
  statusCode: string;
};

export const errorMiddleware = async (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (error instanceof PrismaClientKnownRequestError) {
    const errorMessage = getDbErrorMessage(error.code);

    return ResponseWriter.error(res, errorMessage, "", 400);
  } else if (error instanceof AppException) {
    return ResponseWriter.error(
      res,
      error.data.message,
      "",
      error.data.statusCode
    );
  } else {
    return ResponseWriter.error(res, error.message, "", 500);
  }
};
