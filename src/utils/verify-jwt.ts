import { verify } from "hono/jwt";
import { env } from "../env";

export const verifyJwt = async (token: string) => {
  try {
    return await verify(token, env.SECRET_KEY);
  } catch (error) {
    return null;
  }
};
