const mongoose = require("../modules/connect");

const Priority = Object.freeze({
  HIGH: "HIGH",
  MEDIUM: "MEDIUM",
  LOW: "LOW",
});

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  priority: {
    type: String,
    enum: Object.values(Priority),
  },
  status: {
    type: Boolean,
  },
  assignee: {
    type: String,
  },
});

const Task = mongoose.model("task", taskSchema);
module.exports = Task;
