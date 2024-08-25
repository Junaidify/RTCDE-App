const express = require("express");
const router = express.Router();
const Task = require("../schemas/taskSchema");
const { authorizeRole, authorizeToken } = require("../middleware/verify");

router.use(express.json());

router.post(
  "/tasks",
  authorizeToken,
  authorizeRole(["admin"]),
  async (req, res) => {
    const newTask = req.body;

    if (
      !newTask.title ||
      !newTask.priority ||
      !newTask.status ||
      !newTask.assignee
    ) {
      return res.status(400).json({ error: "All fields are required" });
    }

    try {
      await Task.create(newTask);
      res.status(201).json({ message: "Task created successfully" });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }
);

router.patch(
  "/tasks/:id",
  authorizeToken,
  authorizeRole(["admin"]),
  async (req, res) => {
    const updatedTaskId = req.params.id;
    const updatedTask = req.body;

    if (!updatedTask || Object.keys(updatedTask).length === 0) {
      return res.status(400).json({ error: "No fields provided for update" });
    }

    try {
      const task = await Task.findByIdAndUpdate(
        updatedTaskId,
        { $set: updatedTask },
        { new: true, runValidators: true }
      );

      if (!task) {
        return res.status(404).json({ error: "Task not found" });
      }

      res.status(200).json({ message: "Task updated successfully", task });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }
);

router.delete(
  "/tasks/:id",
  authorizeToken,
  authorizeRole(["admin"]),
  async (req, res) => {
    const taskId = req.params.id;

    try {
      const task = await Task.findByIdAndDelete(taskId);

      if (!task) {
        return res.status(404).json({ error: "Task not found" });
      }

      res.status(200).json({ message: "Task deleted successfully" });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }
);

router.get(
  "/tasks/:id",
  authorizeToken,
  authorizeRole(["admin"]),
  async (req, res) => {
    const taskId = req.params.id;

    try {
      const task = await Task.findById(taskId);

      if (!task) {
        return res.status(404).json({ error: "Task not found" });
      }

      res.status(200).json(task);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }
);

router.get(
  "/tasks",
  async (req, res) => {
    const { priority, status, assignee, title } = req.query;
    const filter = {};
    if (title) filter.title = title;
    if (assignee) filter.assignee = assignee;
    if (priority) filter.priority = priority;
    if (status) filter.status = status;

    try {
      const tasks = await Task.find(filter);

      if (tasks.length === 0) {
        return res.status(404).json({ message: "No tasks found" });
      }

      res.status(200).json(tasks);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }
);

router.get("/admin", authorizeToken, authorizeRole(["admin"]), (req, res) => {
  res.status(200).json({ message: "Welcome, Admin" });
});

module.exports = router;
