import { Hono } from "hono"

export const createIndexController = () => {
    const app = new Hono();

    app.get("/", (c) => {
        return c.json({
            message: "Hello World"
        })
    })

    return app;
}