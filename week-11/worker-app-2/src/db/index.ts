import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { hashPassword } from "../utils/auth";
import { Context } from "hono";

interface User {
  id?: number;
  email: string;
  username: string;
}

interface UserCred extends User {
  password: string;
}

interface Post {
  title: string;
  body: string;
  tags: string[];
  id?: number;
  authorId?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

interface EditPost {
  title?: string;
  body?: string;
  tags?: string[];
}

function createPrismaClientWithContext(ctx: Context) {
  const datasourceUrl = ctx.env.DATABASE_URL;
  return new PrismaClient({ datasourceUrl }).$extends(withAccelerate());
}

export async function createUser(
  user: UserCred,
  ctx: Context,
): Promise<User | undefined> {
  const prisma = createPrismaClientWithContext(ctx);

  const { username, password, email } = user;
  const hashedPassword = hashPassword(password);
  if (!hashPassword) return;
  try {
    const user = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
      },
      select: {
        username: true,
        email: true,
        id: true,
      },
    });
    return user;
  } catch (err) {
    console.log(err);
    return;
  }
}

export async function isUserInDatabase(
  query: User,
  ctx: Context,
): Promise<UserCred | null> {
  const prisma = createPrismaClientWithContext(ctx);

  const user = await prisma.user.findFirst({
    where: { OR: [{ username: query.username }, { email: query.email }] },
  });

  return user;
}

export async function getUser(
  email: string,
  ctx: Context,
): Promise<UserCred | null> {
  const prisma = createPrismaClientWithContext(ctx);

  const user = await prisma.user.findFirst({
    where: { email },
  });

  return user;
}

export async function createPost(
  post: Post,
  authorId: number,
  ctx: Context,
): Promise<Post | null> {
  const prisma = createPrismaClientWithContext(ctx);

  const res = await prisma.post.create({
    data: {
      authorId,
      ...post,
    },
  });

  return res;
}

export async function getPostById(
  postId: number,
  ctx: Context,
): Promise<Post | null> {
  const prisma = createPrismaClientWithContext(ctx);

  const post = await prisma.post.findUnique({
    where: {
      id: postId,
    },
  });

  return post;
}

export async function editPost(
  post: EditPost,
  postId: number,
  userId: number,
  ctx: Context,
): Promise<Post | null> {
  const prisma = createPrismaClientWithContext(ctx);

  const newPost = await prisma.post.update({
    data: { ...post },
    where: { id: postId, authorId: userId },
  });

  return newPost;
}

export async function deletePost(
  postId: number,
  userId: number,
  ctx: Context,
): Promise<Post | null> {
  const prisma = createPrismaClientWithContext(ctx);

  const deletedPost = await prisma.post.delete({
    where: {
      id: postId,
      authorId: userId,
    },
  });

  return deletedPost;
}

export async function getPost(ctx: Context): Promise<Post[]> {
  const prisma = createPrismaClientWithContext(ctx);

  const posts = await prisma.post.findMany({
    take: 10,
    orderBy: [
      {
        createdAt: "desc",
      },
      {
        popularity: "desc",
      },
    ],
  });
  return posts;
}
