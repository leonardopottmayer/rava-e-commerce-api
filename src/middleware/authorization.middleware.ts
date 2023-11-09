import { UserRole } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import { AppException } from "../models/exception/app.exception";

export const ensureRole = (allowedRoles: UserRole[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    if (!allowedRoles.includes(req.user.role)) {
      throw new AppException({
        message: "You do not have the required role for using this endpoint.",
        statusCode: 403,
      });
    }

    next();
  };
};
