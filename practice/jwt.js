const express = require("express");
const mongoose = require("mongoose");
const zod = require("zod");
const jwt = require("jsonwebtoken");
const jwtPassword = "supersecretjwtpass";

mongoose.connect("mongodb+srv://spectre:jp7WwBISLdpMuGRQ@spectre.qmv29oc.mongodb.net/practice");
const Users = mongoose.model("Users", {
  username: String,
  password: String,
  name: String,
});

const app = express();
const port = 3005;

app.use(express.json());

app.post("/signup", verifyUserObject, async function (req, res) {
  const name = req.body.name;
  const username = req.body.username;
  const password = req.body.password;

  const existingUser = await Users.findOne({ username });
  if (existingUser) {
    return res.status(400).send("User already exists");
  }

  const user = await Users.create({
    name,
    username,
    password,
  });

  user.save();
  res.send("User created");
});

app.post("/signin", verifyUserObject, function (req, res) {
  const username = req.body.username;
  const password = req.body.password;

  if (!userExists(username, password)) {
    return res.status(403).json({
      msg: "User doesn't exist",
    });
  }

  const token = jwt.sign({ username }, jwtPassword);
  res.json({ authorization: token });
});

app.get("/users", async function (req, res) {
  const token = req.headers.authorization;
  try {
    const decoded = jwt.verify(token, jwtPassword);
    const username = decoded.username;
    const users = await Users.find({ username: { $ne: username } });
    res.json({ users });
  } catch (err) {
    console.log(err);
    res.status(403).send("Invalid token");
  }
});

app.all("*", function (req, res) {
  res.status(404).send("URL not found");
});

app.use(function (err, req, res, next) {
  res.json({
    msg: "Oops! something went wrong.",
  });
});

app.listen(port, () => console.log(`App live at http://localhost:${port}/`));

function userExists(username, Hashedpassword) {
  const user = Users.findOne({
    username,
    password: Hashedpassword,
  });
  return user !== undefined;
}

function verifyUserObject(req, res, next) {
  const schema = zod.object({
    username: zod.string().email(),
    password: zod.string().min(8),
    name: zod.string().optional(),
  });

  const parsed = schema.safeParse(req.body);
  if (parsed.success) {
    next();
  } else {
    res.status(422).send("Unacceptable entity");
  }
}
