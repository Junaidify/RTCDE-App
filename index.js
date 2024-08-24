const express = require("express");
const app = express();
const cors = require("cors");

const signUpRouter = require("./project-root/services/authentication");
const taskCreation = require("./project-root/services/task");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", signUpRouter);
app.use("/", taskCreation);

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
