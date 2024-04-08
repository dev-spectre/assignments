import zod from "zod";

export const create = zod.object({
  title: zod.string().min(1).max(255),
  body: zod.string().min(1),
  tags: zod.array(zod.string().min(1).regex(/[^\s]/g)),
});

export const update = zod.object({
  title: zod.string().min(1).max(255).optional(),
  body: zod.string().min(1).optional(),
  tags: zod.array(zod.string().min(1).regex(/[^\s]/g)).optional(),
});

const postSchema = {
  create,
  update,
};

export default postSchema;
