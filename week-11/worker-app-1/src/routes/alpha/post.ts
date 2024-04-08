import { Hono } from "hono";
import { jwt, decode } from "hono/jwt";
import { env } from "hono/adapter";
import { createPost, getPostById, editPost, deletePost, getPost } from "../../db";

const post = new Hono();

post.get("/", async (ctx) => {
  const posts = await getPost(ctx);
  return ctx.json({
    status: 200,
    msg: "Fetched post",
    data: { posts },
  });
});

post.use("*", (ctx, next) => {
  const { JWT_KEY } = env<{ JWT_KEY: string }>(ctx);
  const jwtMiddleware = jwt({ secret: JWT_KEY });
  return jwtMiddleware(ctx, next);
});

post.post("/", async (ctx) => {
  const { req } = ctx;
  const authToken = req.header("Authorization")?.split(" ")?.at(1) ?? "";
  try {
    const userId = await decode(authToken)?.payload?.userId;
    if (!userId)
      return (
        ctx.status(422),
        ctx.json({
          status: 422,
          msg: "Missing parameters: userId not found in JWT",
        })
      );

    const post: { title: string; blog: string } = await req.json();
    if (!post.title || !post.blog)
      return (
        ctx.status(422),
        ctx.json({
          status: 422,
          msg: "Missing parameters",
        })
      );

    const generatedPost = await createPost(post, userId, ctx);
    if (!generatedPost)
      return (
        ctx.status(500),
        ctx.json({
          status: 500,
          msg: "Couldn't create post",
        })
      );

    return ctx.json({
      status: 201,
      msg: "Post created",
      data: {
        postId: generatedPost.id,
        authorId: generatedPost.authorId,
        title: generatedPost.title,
      },
    });
  } catch (err) {
    console.log(err);
    return (
      ctx.status(400),
      ctx.json({
        status: 400,
        msg: "Error while parsing JWT",
      })
    );
  }
});

post.get("/:id", async (ctx) => {
  const postId = parseInt(ctx.req.param("id"));
  const post = await getPostById(postId, ctx);
  if (!post)
    return (
      ctx.status(404),
      ctx.json({
        status: 404,
        msg: `Resource not found: couldn't find post with id ${postId}`,
      })
    );

  return ctx.json({
    status: 201,
    msg: "Fetched post",
    data: { ...post },
  });
});

post.put("/:id", async (ctx) => {
  const { req } = ctx;

  const authToken = req.header("Authorization")?.split(" ")?.at(1) ?? "";
  try {
    const userId = decode(authToken).payload?.userId;
    if (!userId) throw new Error("UserId missing in JWT");

    const postId = parseInt(req.param("id"));
    const post: { title: string; blog: string } = await req.json();

    const newPost = await editPost(post, postId, userId, ctx);
    if (!newPost)
      return (
        ctx.status(404),
        ctx.json({
          status: 404,
          msg: `Resource not found: Post not found with id ${postId}`,
        })
      );

    return ctx.json({
      status: 201,
      msg: "Post updated",
      data: {
        id: newPost.id,
        authorId: newPost.authorId,
        title: newPost.title,
      },
    });
  } catch (err) {
    console.log(err);
    ctx.status(400);
    return ctx.json({
      status: 400,
      msg: "Couldn't parse JWT",
    });
  }
});

post.delete("/:id", async (ctx) => {
  const { req } = ctx;
  const authToken = req.header("Authorization")?.split(" ")?.at(1) ?? "";
  try {
    const userId = decode(authToken).payload?.userId;
    if (!userId) throw new Error("UserId missing in JWT");

    const postId = parseInt(req.param("id"));

    const deletedPost = await deletePost(postId, userId, ctx);
    if (!deletedPost)
      return (
        ctx.status(404),
        ctx.json({
          status: 404,
          msg: `Resource not found: Post not found with id ${postId}`,
        })
      );

    return ctx.json({
      status: 201,
      msg: "Post deleted",
      data: {
        id: deletedPost.id,
        authorId: deletedPost.authorId,
        title: deletedPost.title,
      },
    });
  } catch (err) {
    console.log(err);
    ctx.status(400);
    return ctx.json({
      status: 400,
      msg: "Couldn't parse JWT",
    });
  }
});

export default post;
