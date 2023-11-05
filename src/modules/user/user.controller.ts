import { Request, Response } from "express";
import { UserService } from "./user.service";

export class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  async getUserById(req: Request, res: Response) {
    const { userId } = req.body;

    const user = await this.userService.getUserById(userId);

    return res.status(200).json(user);
  }
}
