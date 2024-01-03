const { Router } = require("express");
const zod = require("zod");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const adminMiddleware = require("../middleware/admin");
const { Admin, Course } = require("../db/index.js");

const jwtpassword = "superSeceretJWTpassword";
const router = Router();

// Admin Routes
router.post("/signup", async (req, res) => {
  // Implement admin signup logic
  const username = req.headers.username;
  const password = req.headers.password;

  if (username === undefined || password === undefined) return res.status(400).json({ message: "Missing parameters" });

  const user = await Admin.findOne({ username });
  if (user) {
    return res.status(409).json({ message: "User already exists" });
  }

  const hashedPassword = hashPassword(password);

  Admin.create({
    username,
    password: hashedPassword,
  });

  res.json({ message: "User created successfully" });
});

router.post("/signin", async (req, res) => {
  // Implement admin signup logic
  const username = req.headers.username;
  const password = req.headers.password;
  
  if (username === undefined || password === undefined) return res.status(400).json({ message: "Missing parameters" });

  const user = await Admin.findOne({ username });
  if (!user) return res.status(409).json({ message: "User doesn't exists" });
  if (!verifyPassword(password, user.password)) {
    return res.status(401).json({ message: "Incorrect user details" });
  }

  const jwtClaims = { username };
  const token = jwt.sign(jwtClaims, jwtpassword);
  res.json({ token });
});

router.post("/courses", adminMiddleware, validateCourse, async (req, res) => {
  // Implement course creation logic
  req.body.author = req.token.username;
  try {
    const course = new Course(req.body);
    const document = await course.save();
    res.json({
      message: "Course created successfully",
      courseId: document._id,
    });
  } catch (err) {
    return res.status(500).send("Error: Occured while saving course");
  }
});

router.get("/courses", adminMiddleware, async (req, res) => {
  // Implement fetching all courses logic
  const username = req.token.username;
  const courses = (await Course.find({ author: username })).map((course) => {
    return {
      title: course.title,
      id: course._id,
      description: course.description,
      price: course.price,
      imageLink: course.imageLink,
      published: course.published,
    };
  });
  res.json({ courses });
});

const NOISE_LENGTH = 78;
const SALT_LENGTH = 104;
const PBKDF2_ITERATION = 1200;
const PBKDF2_LENGTH = 150;
const DIGEST = "sha512";

function hashPassword(password, salt = null) {
  if (salt && salt.length !== SALT_LENGTH) return;
  if (salt === null) salt = crypto.randomBytes(NOISE_LENGTH).toString("base64");
  const hashPassword = crypto.pbkdf2Sync(password, salt, PBKDF2_ITERATION, PBKDF2_LENGTH, DIGEST).toString("base64");
  const firstHalfOfSalt = salt.slice(0, SALT_LENGTH / 2);
  const secondHalfOfSalt = salt.slice(SALT_LENGTH / 2, SALT_LENGTH);
  return `${secondHalfOfSalt}${hashPassword}${firstHalfOfSalt}`;
}

function verifyPassword(password, hashedPassword) {
  const hashedPasswordLength = hashedPassword.length - SALT_LENGTH;
  const salt = `${hashedPassword.slice(hashedPasswordLength + SALT_LENGTH / 2, hashedPassword.length)}${hashedPassword.slice(0, SALT_LENGTH / 2)}`;
  return hashPassword(password, salt) === hashedPassword;
}

function validateCourse(req, res, next) {
  const courseSchema = zod.object({
    title: zod.string().min(3),
    description: zod.string().min(10),
    price: zod.number(),
    imageLink: zod.string().url(),
    published: zod.boolean().optional(),
  });

  const course = courseSchema.safeParse(req.body);
  if (course.success) next();
  else res.status(400).send("Invalid Format");
}

module.exports = router;
