import { UserRole } from "@prisma/client";

export type TokenUserInfoPayload = {
  id: number;
  name: string;
  username: string;
  email: string;
  role: UserRole;
  createdAt: Date;
  updatedAt: Date;
};
