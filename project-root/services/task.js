const express = require("express");
const router = express.Router();
const Task = require("../schemas/taskSchema");
const { authorizeRole, authorizeToken } = require("../middleware/verify");

router.use(express.json());

router.post(
  "/tasks",
  authorizeToken,
  authorizeRole("admin"),
  async (req, res) => {
    const newTask = req.body;

    console.log(newTask);
    if (
      !newTask.title ||
      !newTask.priority ||
      newTask.status.length === 0 ||
      !newTask.assignee
    ) {
      return res.status(400).send({ data: "All fields are required" });
    }

    try {
      await Task.create(newTask);
      res.status(201).send({ data: "Task is created" });
    } catch (err) {
      console.log(err);
      return res.status(400).json({ data: "Something went wrong with task" });
    }
  }
);

router.patch(
  "/tasks/:id",
  authorizeToken,
  authorizeRole("admin"),
  async (req, res) => {
    const updatedUserId = req.params.id;
    const updatedUser = req.body;

    if (!updatedUser || Object.keys(updatedUser).length === 0) {
      return res.status(204).send({ data: "No fields are provided" });
    }

    try {
      const userExist = await Task.findByIdAndUpdate(
        updatedUserId,
        { $set: updatedUser },
        { new: true, runValidators: true }
      );

      if (!userExist) {
        return res.status(204).send({ data: "No user found" });
      }

      await userExist.save();
      res.status(200).send({ data: "Updated Successfully" });
    } catch (err) {
      return res
        .status(400)
        .send({ data: "Something went wrong in user update field" });
    }
  }
);

router.delete(
  "/tasks/:id",
  authorizeToken,
  authorizeRole("admin"),
  async (req, res) => {
    const deleteUser = req.params.id;

    if (!deleteUser)
      return res.status(404).send({ data: "Provide user credientals" });

    try {
      await Task.findByIdAndDelete(deleteUser);
      res.status(200).send({ data: "user is deleted" });
    } catch (err) {
      return res
        .status(500)
        .send({ data: `something went wrong during deletion ${err}` });
    }
  }
);

router.get(
  "/tasks/:id",
  authorizeToken,
  authorizeRole("admin"),
  async (req, res) => {
    const specificUser = req.params.id;

    if (!specificUser) {
      return res.status(400).send({ data: "Provide Correct Id" });
    }

    try {
      const user = await Task.findById(specificUser);
      res.status(200).send(user);
    } catch (err) {
      return res.status(400).send({ data: "User doesn't exist" });
    }
  }
);

router.get(
  "/tasks",
  authorizeToken,
  authorizeRole("admin"),
  async (req, res) => {
    const { priority, status, assignee, title } = req.query;
    try {
      const filter = {};
      if (title) filter.title = title;
      if (assignee) filter.assignee = assignee;
      if (priority) filter.priority = priority;
      if (status) filter.status = status;

      users = await Task.find(filter);
      res.status(200).send(users);
    } catch (err) {
      return res.status(404).send({ data: "User doesn't exist" });
    }
  }
);

module.exports = router;
