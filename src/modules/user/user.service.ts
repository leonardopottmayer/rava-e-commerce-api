import { PrismaClient, User } from "@prisma/client";

export class UserService {
  private db: PrismaClient;

  constructor() {
    this.db = new PrismaClient();
  }

  async getUserById(id: string): Promise<User | null> {
    return await this.db.user.findUnique({ where: { id } });
  }
}
