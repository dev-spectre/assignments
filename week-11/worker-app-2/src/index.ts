import { Hono } from "hono";
import alpha from "./routes/alpha";

const app = new Hono();

app.route("api/v1", alpha);

app.all("*", (ctx) => {
  ctx.status(404);
  return ctx.json({
    status: 404,
    msg: "Unknown endpoint: API endpoint not found",
  });
});

export default app;
