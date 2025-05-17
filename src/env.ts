import "dotenv/config";
import { z } from "zod";

export const env = z
  .object({
    NODE_ENV: z.enum(["DEVELOPMENT", "PRODUCTION"]).default("DEVELOPMENT"),
    DATABASE_URL: z.string({ message: "Server ENV" }),
    STATIC_BASE_URL: z
      .string({ message: "Static URL Server ENV" })
      .default("http://localhost:5000/static"),
    PORT: z
      .string()
      .default("5000")
      .transform((e) => Number(e)),
  })
  .parse(process.env);
