const { Router } = require("express");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const userMiddleware = require("../middleware/user");
const { User, Course } = require("../db/index.js");

const jwtpassword = "superSeceretJWTpassword";
const router = Router();

// User Routes
router.post("/signup", async (req, res) => {
  // Implement user signup logic
  const username = req.headers.username;
  const password = req.headers.password;

  if (username === undefined || password === undefined) return res.status(400).json({ message: "Missing parameters" });

  const hashedPassword = hashPassword(password);

  const user = await User.findOne({ username });
  if (user) return res.status(409).json({ message: "User already exists" });

  User.create({
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

  const user = await User.findOne({ username });
  if (!user) return res.status(409).json({ message: "User doesn't exists" });
  if (!verifyPassword(password, user.password)) return res.status(401).json({ message: "Incorrect user details" });

  const jwtClaims = { username };
  const token = jwt.sign(jwtClaims, jwtpassword);
  res.json({ token });
});

router.get("/courses", async (req, res) => {
  // Implement listing all courses logic
  const courses = (await Course.find({})).map((course) => {
    return {
      id: course._id,
      title: course.title,
      description: course.description,
      price: course.price,
      imageLink: course.imageLink,
      published: course.published,
    };
  });
  res.json({ courses });
});

router.post("/courses/:courseId", userMiddleware, async (req, res) => {
  // Implement course purchase logic
  const courseId = req.params.courseId;
  const username = req.token.username;

  try {
    await Course.findById(courseId);
  } catch (err) {
    return res.status(404).send("Course not found");
  }

  const user = await User.findOneAndUpdate({ username }, { $push: [courseId] });
  if (user.purchasedCourses.includes(courseId)) return res.json({ message: "Course already purchased" });

  user.purchasedCourses.push(courseId);
  try {
    await user.save();
  } catch (err) {
    return res.status(500).send("Oops!! something went wrong.");
  }
  res.json({ message: "Course purchased succesfully" });
});

router.get("/purchasedCourses", userMiddleware, async (req, res) => {
  // Implement fetching purchased courses logic
  const username = req.token.username;
  const user = await User.findOne({ username });
  const purchasedCourses = (await Course.find({ _id: { $in: user.purchasedCourses } })).map((course) => {
    return {
      id: course._id,
      title: course.title,
      description: course.description,
      price: course.price,
      imageLink: course.imageLink,
      published: course.published,
    };
  });
  res.json({ purchasedCourses });
});

const NOISE_LENGTH = 78;
const SALT_LENGTH = 104;
const PBKDF2_ITERATION = 1200;
const PBKDF2_LENGTH = 150;
const DIGEST = "sha512";

function hashPassword(password, salt = null) {
  if (salt && salt.length !== SALT_LENGTH) return;
  if (!salt) salt = crypto.randomBytes(NOISE_LENGTH).toString("base64");
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

module.exports = router;
