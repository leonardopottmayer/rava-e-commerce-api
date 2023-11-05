import { User } from "@prisma/client";

export type JwtTokenPayload = {
  user: User;
};
