import express from "express";
import Todo from "../models/Todo.js";
import { protect } from "../controllers/authmiddleware.js";

const router = express.Router();

router.get("/", protect, async (req, res) => {
  try {
    const todos = await Todo.find({ userId: req.user.id }).sort({
      createdAt: -1,
    });
    res.status(200).json(todos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch tasks" });
  }
});

router.post("/", protect, async (req, res) => {
  try {
    const { title } = req.body;
    if (!title)
      return res.status(400).json({ error: "Task title is required" });

    const newTodo = new Todo({
      title,
      userId: req.user.id,
    });
    await newTodo.save();
    res.status(201).json(newTodo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to add task" });
  }
});

router.put("/:id", protect, async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await Todo.findOne({ _id: id, userId: req.user.id });
    if (!todo) return res.status(404).json({ error: "Task not found" });

    todo.isCompleted = !todo.isCompleted;
    await todo.save();
    res.status(200).json(todo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update task" });
  }
});

router.delete("/:id", protect, async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await Todo.findOneAndDelete({ _id: id, userId: req.user.id });
    if (!todo) return res.status(404).json({ error: "Task not found" });
    res
      .status(200)
      .json({ success: true, message: "Task dropped successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to remove task" });
  }
});

export default router;
