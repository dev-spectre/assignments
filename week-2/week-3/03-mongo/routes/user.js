const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const { User, Course } = require("../db/index.js");

// User Routes
router.post("/signup", async (req, res) => {
  // Implement user signup logic
  const username = req.headers.username;
  const password = req.headers.password;

  const existingUser = await User.findOne({ username });
  if (existingUser) {
    return res.status(409).send("User already exists");
  }

  const user = new User({ username, password });
  const document = await user.save();
  if (!document) {
    return res.status(500).send("Oops!! something went wrong.");
  }
  res.json({ message: "User created successfully" });
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
  const user = await User.findOneAndUpdate({ username });

  try {
    await Course.findById(courseId);
  } catch (err) {
    return res.status(404).send("Course not found");
  }

  if (user.purchasedCourses.includes(courseId)) return res.json({ message: "Course already purchased" });

  user.purchasedCourses.push(courseId);
  const doc = await user.save();
  if (!doc) return res.status(500).send("Oops!! something went wrong.");
  res.json({ message: "Course purchased succesfully" });
});

router.get("/purchasedCourses", userMiddleware, async (req, res) => {
  // Implement fetching purchased courses logic
  const username = req.headers.username;
  const user = await User.findOne({ username });
  const purchasedCourses = (await Course.find({ _id: { $in: user.purchasedCourses } })).map(course => {
    return {
        id: course._id,
        title: course.title,
        description: course.description,
        price: course.price,
        imageLink: course.imageLink,
        published: course.published,
    }
  });
  res.json({ purchasedCourses });
});

module.exports = router;
