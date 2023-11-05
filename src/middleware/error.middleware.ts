import { NextFunction, Request, Response } from "express";
import { AppException } from "../models/exception/app.exception";

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
  if (error instanceof AppException) {
    return res.status(error.data.statusCode).json(error.data);
  } else {
    return res.status(500).json({ nessage: "No auth" });
  }
};

const getErrorMessageAndStatusCode = (
  error: AppException
): ErrorResponseData | any => {};
