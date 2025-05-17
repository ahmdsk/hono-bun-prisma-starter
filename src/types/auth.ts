import { JWTPayload } from "hono/utils/jwt/types";

export type Role = "admin" | "manajer" | "driver";

type BaseAuth<T extends Role | undefined> = JWTPayload & {
  id: number;
  email: string;
  role: T;
};

interface AuthPayloadUser extends BaseAuth<"admin"> {
  id: number;
  name: string;
  email: string;
}

export type AuthPayload<T extends Role | undefined = Role> = BaseAuth<T> &
  AuthPayloadUser;
