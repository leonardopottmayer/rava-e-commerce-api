import Joi from "joi";
import { UserDefaultLoginCredentialsDto } from "./models/user-default-login-credentials.dto";
import { UserDefaultRegisterDataDto } from "./models/user-default-register-data.dto";
import { AppException } from "../../models/exception/app.exception";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { PrismaClient, User } from "@prisma/client";
import { JwtTokenPayload } from "../../models/jwt/jwt-token-payload.type";
import { TokenUserInfoPayload } from "./models/token-user-info-payload.type";

export class AuthService {
  private db: PrismaClient;

  constructor() {
    this.db = new PrismaClient();
  }

  async login(
    loginCredentialsDto: UserDefaultLoginCredentialsDto
  ): Promise<string> {
    const dtoValidationSchema = Joi.object({
      usernameOrEmail: Joi.string().min(2).max(100).required(),
      password: Joi.string().min(8).max(30).required(),
    });

    const { error } = dtoValidationSchema.validate(loginCredentialsDto);

    if (error) {
      throw new AppException({
        message: error.message,
        statusCode: 400,
      });
    }

    let foundUser: User | null;

    if (loginCredentialsDto.usernameOrEmail.includes("@")) {
      foundUser = await this.db.user.findUnique({
        where: { email: loginCredentialsDto.usernameOrEmail },
      });
    } else {
      foundUser = await this.db.user.findUnique({
        where: { username: loginCredentialsDto.usernameOrEmail },
      });
    }

    if (!foundUser) {
      throw new AppException({
        message: "User not found.",
        statusCode: 404,
      });
    }

    const checkPassword = await bcrypt.compare(
      loginCredentialsDto.password,
      foundUser.password
    );

    if (!checkPassword) {
      throw new AppException({
        message: "Invalid password.",
        statusCode: 401,
      });
    }

    try {
      const secret = process.env.AUTH_PASSWORD_SECRET ?? "";

      const userInfo: TokenUserInfoPayload = {
        id: foundUser.id,
        name: foundUser.name,
        username: foundUser.username,
        email: foundUser.email,
        createdAt: foundUser.createdAt,
        updatedAt: foundUser.updatedAt,
      };

      const tokenPayload: JwtTokenPayload = {
        user: userInfo,
      };

      const token = jwt.sign(tokenPayload, secret, { expiresIn: "1d" });

      return token;
    } catch (error) {
      throw new AppException({
        message: "Failed to authenticate.",
        statusCode: 500,
      });
    }
  }

  async register(registerDataDto: UserDefaultRegisterDataDto): Promise<User> {
    const dtoValidationSchema = Joi.object({
      name: Joi.string().min(2).max(100).required(),
      username: Joi.string().min(2).max(30).required(),
      email: Joi.string().email().required(),
      password: Joi.string().min(8).max(30).required(),
      passwordConfirmation: Joi.string().min(8).max(30).required(),
    });

    const { error } = dtoValidationSchema.validate(registerDataDto);

    if (error) {
      throw new AppException({
        message: error.message,
        statusCode: 400,
      });
    }

    if (registerDataDto.password != registerDataDto.passwordConfirmation) {
      throw new AppException({
        message: "Passwords don't match.",
        statusCode: 400,
      });
    }

    const salt = await bcrypt.genSalt(16);
    const hashedPassword = await bcrypt.hash(registerDataDto.password, salt);

    let createdUser: User;

    createdUser = await this.db.user.create({
      data: {
        name: registerDataDto.name,
        username: registerDataDto.username,
        email: registerDataDto.email,
        password: hashedPassword,
      },
    });

    return createdUser;
  }
}
