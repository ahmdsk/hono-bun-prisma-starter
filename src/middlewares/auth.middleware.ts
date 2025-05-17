import { Handler } from "hono";
import { HTTPException } from "hono/http-exception";
import { verifyJwt } from "../utils/verify-jwt";
import { AuthPayload, Role } from "../types/auth";
import { createMiddleware } from "hono/factory";

export const createAuthMiddleware = <T extends Role>(...roles: T[]) =>
  createMiddleware<{
    Variables: {
      auth: AuthPayload<T>;
    };
  }>(async (c, next) => {
    const authorization = c.req.header().authorization?.split(" ")[1];
    if (!authorization) {
      throw new HTTPException(401, {
        message: "Unauthorized",
      });
    }

    const auth = (await verifyJwt(authorization)) as AuthPayload<T> | null;
    if (!auth || !auth.email) {
      throw new HTTPException(401, {
        message: "Unauthorized",
      });
    }

    if (roles.length && !roles.includes(auth.role)) {
      throw new HTTPException(403, {
        message: "Unauthorized Role",
      });
    }

    c.set("auth", auth);

    await next();
  });
