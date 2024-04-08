import { Hono } from "hono";
import user from "./user";
import post from "./post";
import { cors } from "hono/cors";

const alpha = new Hono();

alpha.use("*", cors());

alpha.route("/user", user);
alpha.route("/post", post);

export default alpha;
