import { Request, Response } from "express";
import { AuthService } from "./auth.service";
import { UserDefaultRegisterDataDto } from "./models/user-default-register-data.dto";
import { UserDefaultLoginCredentialsDto } from "./models/user-default-login-credentials.dto";
import { ResponseWriter } from "../../utils/response-writer";

export class AuthController {
  private authService: AuthService;

  constructor() {
    this.authService = new AuthService();
  }

  async register(req: Request, res: Response) {
    const { name, username, email, password, passwordConfirmation } = req.body;

    const registerDto: UserDefaultRegisterDataDto = {
      name,
      username,
      email,
      password,
      passwordConfirmation,
    };

    const user = await this.authService.register(registerDto);

    return ResponseWriter.success(res, "Successfully registered.", user, 201);
  }

  async login(req: Request, res: Response) {
    const { usernameOrEmail, password } = req.body;

    const loginDto: UserDefaultLoginCredentialsDto = {
      usernameOrEmail,
      password,
    };

    const token = await this.authService.login(loginDto);

    return ResponseWriter.success(
      res,
      "Successfully authenticated.",
      token,
      200
    );
  }
}
