import zod from "zod";

const signup = zod.object({
  username: zod.string(),
  email: zod.string().email(),
  password: zod.string().min(8).max(256),
});

const singin = zod.object({
  email: zod.string().email(),
  password: zod.string().min(8).max(256),
});

const userSchema = {
  signup,
  singin,
};

export default userSchema;