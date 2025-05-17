import { ErrorHandler } from "hono";
import { HTTPException } from "hono/http-exception";
import { env } from "../env";

export const globalErrorMiddleware: ErrorHandler = (err, c) => {
  if (err instanceof HTTPException && err.message) {
    return c.json(
      {
        message: err.message,
      },
      err.status
    );
  }
  console.error("APP ERROR:", err);
  if (env.NODE_ENV == "PRODUCTION")
    err.message = "Galat, Mohon coba beberapa saat lagi!";
  return c.json({ message: err.message }, 500);
};