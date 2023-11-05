import { NextFunction, Request, Response } from "express";
import { AppException } from "../models/exception/app.exception";
import jwt from "jsonwebtoken";
import jwtDecode from "jwt-decode";
import { UserService } from "../modules/user/user.service";
import { JwtTokenPayload } from "../models/jwt/jwt-token-payload.type";

export const ensureAuthentication = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userService = new UserService();

  if (!req.headers.authorization) {
    throw new AppException({
      message: "You are not authenticated",
      timestamp: new Date().getTime(),
      statusCode: 401,
    });
  }

  const authHeader = req.headers.authorization;
  const authHeaderToken = authHeader.split(" ")[1];

  if (!authHeaderToken) {
    throw new AppException({
      message: "You are not authenticated",
      timestamp: new Date().getTime(),
      statusCode: 401,
    });
  }

  let verified;

  try {
    verified = jwt.verify(authHeaderToken, process.env.AUTH_PASSWORD_SECRET!);
  } catch (error: any) {
    throw new AppException({
      message: "You are not authenticated",
      timestamp: new Date().getTime(),
      statusCode: 401,
    });
  }

  const decodedTokenPayload: JwtTokenPayload =
    jwtDecode.jwtDecode(authHeaderToken);

  const requestUser = await userService.getUserById(
    decodedTokenPayload.user.id
  );

  if (!requestUser) {
    throw new AppException({
      message: "Invalid user id in token",
      timestamp: new Date().getTime(),
      statusCode: 401,
    });
  }

  req.user = requestUser;

  next();
};
