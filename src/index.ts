import { Hono } from "hono";
import { env } from "./env";
import { globalErrorMiddleware } from "./middlewares/error.middleware";
import { notFoundMiddleware } from "./middlewares/notfound.middleware";
import { cors } from "hono/cors";
import { logger as l } from "hono/logger";
import { serveStatic } from "hono/bun";

import moment from "moment";

import { createIndexController } from "./controllers/index.controller";

const app = new Hono();

env.NODE_ENV != "PRODUCTION" &&
  app.use(
    l((...params) => {
      params.map((e) => console.log(`${moment().toISOString()} | ${e}`));
    })
  );
app.use(cors());

app.use(
  "/static/*",
  serveStatic({
    root: "./",
  })
);

app.onError(globalErrorMiddleware);
app.notFound(notFoundMiddleware);

env.NODE_ENV != "PRODUCTION" &&
  app.get("/env", (c) => {
    return c.json(env);
  });


app.route("/", createIndexController());

export default app;
