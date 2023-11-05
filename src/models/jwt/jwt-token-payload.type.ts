import { TokenUserInfoPayload } from "../../modules/auth/models/token-user-info-payload.type";

export type JwtTokenPayload = {
  user: TokenUserInfoPayload;
};
