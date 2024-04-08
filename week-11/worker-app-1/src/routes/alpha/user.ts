import { Hono } from "hono";
import { sign } from "hono/jwt";
import { createUser, getUser, isUserInDatabase } from "../../db";
import { verifyPassword } from "../../utils/auth";
import { env } from "hono/adapter";

const DAY = 86400; //60 (1 minute) * 60 (1 hour) * 24 (1 day);

const user = new Hono();

user.post("/signup", async (ctx) => {
  const { req } = ctx;
  const username = req.header("username");
  const email = req.header("email");
  const password = req.header("password");

  if (!username || !email || !password)
    return (
      ctx.status(422),
      ctx.json({
        status: 422,
        msg: "Missing parameters",
      })
    );

  if (await isUserInDatabase({ username, email }, ctx))
    return (
      ctx.status(403),
      ctx.json({
        status: 403,
        msg: "Resource conflict: user already exists",
      })
    );

  const user = await createUser(
    {
      username,
      email,
      password,
    },
    ctx
  );

  if (!user)
    return (
      ctx.status(400),
      ctx.json({
        status: 400,
        msg: "Bad request: Couldn't request user",
      })
    );

  return ctx.json({
    status: 201,
    msg: "User created",
    data: { ...user },
  });
});

user.post("/signin", async (ctx) => {
  const { JWT_KEY } = env<{ JWT_KEY: string }>(ctx);

  const { req } = ctx;
  const username = req.header("username");
  const email = req.header("email");
  const password = req.header("password");

  if (!username || !email || !password)
    return (
      ctx.status(422),
      ctx.json({
        status: 422,
        msg: "Missing parameters",
      })
    );

  const user = await getUser({ username, email }, ctx);
  if (!user)
    return (
      ctx.status(404),
      ctx.json({
        status: 404,
        msg: "Resource not found: user doesn't exists",
      })
    );

  const isVerified = await verifyPassword(password, user.password);
  if (!isVerified)
    return (
      ctx.status(401),
      ctx.json({
        status: 401,
        msg: "Unauthorized: Password doesn't match",
      })
    );

  const payload = {
    userId: user.id,
    username,
    email,
    exp: Math.floor(Date.now() / 1000) + 7 * DAY,
  };

  const authToken = await sign(payload, JWT_KEY);

  return ctx.json({
    status: 201,
    msg: "User signed in",
    data: { authToken },
  });
});

export default user;
