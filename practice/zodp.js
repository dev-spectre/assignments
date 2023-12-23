const zod = require("zod");

const userSchema = {
  username: zod.string(),
  email: zod.string().email({ message: "Invalid email"}),
  password: zod.string().min(8, { message: "Password must be more than 8 characters long"}),
  favNumber: zod.coerce.number(),
  nullVal: zod.void(),
};

let parseResult = ZodObject.safeParse({
  username: "spectre",
  email: "spectre@skynet.com",
  password: "spectreXskynet",
  favNumber: "8",
});

parseResult = parseResult.success? parseResult.data : parseResult.error;
console.log(parseResult);