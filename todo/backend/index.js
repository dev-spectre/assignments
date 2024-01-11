const express = require("express");
const { createTodo, updateTodo } = require("./type");
const { Todo } = require("./db");
const cors = require("cors");

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors({ origin: "http://localhost:5173" }));

app.get("/", function (req, res) {
  res.send("<h1>Todo App</h1>");
});

app.get("/todos", async function (req, res) {
  const todos = await Todo.find({});

  res.json({ todos });
});

app.post("/todo", async function (req, res) {
  const createPayload = req.body;
  const parsedPayload = createTodo.safeParse(createPayload);
  if (!parsedPayload.success) {
    res.status(411).json({ message: "Invalid Payload" });
    return;
  }

  try {
    const todo = await Todo.create({
      title: createPayload.title,
      description: createPayload.description,
    });
    res.json({ message: "Todo created", id: todo._id });
  } catch (err) {
    res.status(500).json({ message: "Unable to create todo" });
    return;
  }
});

app.put("/completed", async function (req, res) {
  const updatePayload = req.body;
  const parsedPayload = updateTodo.safeParse(updatePayload);
  if (!parsedPayload) {
    res.status(411).json({ message: "Invalid Payload" });
    return;
  }

  try {
    const todo = await Todo.findOneAndUpdate({ _id: updatePayload.id }, { completed: true });
    todo.save();
    res.json({ message: "Todo updated" });
  } catch (err) {
    res.status(500).json({ message: "Couldn't mark todo as done" });
    console.error(err);
  }
});

app.listen(PORT, () => console.log("Todo backend live at", `http://localhost:${PORT}`));
