const zod = require("zod");
const { Router, json } = require("express");
const { Admin, Course } = require("../db/index");
const adminMiddleware = require("../middleware/admin");
const router = Router();

router.use(json());

// Admin Routes
router.post("/signup", async (req, res) => {
  // Implement admin signup logic
  const username = req.headers.username;
  const password = req.headers.password;

  const existingUser = await Admin.findOne({ username });
  if (existingUser) {
    return res.status(409).send("User already exists");
  }

  const admin = new Admin({ username, password });
  const document = await admin.save();
  if (!document) {
    return res.status(500).send("Oops!! something went wrong.");
  }
  res.json({ message: "Admin created successfully" });
});

router.post("/courses", adminMiddleware, validateCourse, async (req, res) => {
  // Implement course creation logic
  req.body.author = req.headers.username;
  const course = new Course(req.body);
  const document = await course.save();
  if (!document) {
    return res.status(500).send("Error: Occured while saving course");
  }
  res.json({
    message: "Course created successfully",
    courseId: document._id,
  });
});

router.get("/courses", adminMiddleware, async (req, res) => {
  // Implement fetching all courses logic
  const username = req.headers.username;
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
