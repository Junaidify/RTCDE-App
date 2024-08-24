const express = require("express");
const router = express.Router();
const Auth = require("../schemas/authSchema");

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.post("/", async (req, res) => {
  const { username, password, name, email, role } = req.body;

  if ((!username || !password || !name || !email, !role)) {
    return res.status(400).send({ data: "All fields are required" });
  }

  try {
    const newUser = await Auth.findOne({ email: email });
    console.log(newUser);
    if (newUser) {
      return res.status(400).send({ data: "Your account is already exist" });
    }

    await Auth.create({ username, password, name, email, role });
    res.send({ data: "User created successfully" });
  } catch (err) {
    return res.status(500).send({ err: "Data is not stored" });
  }
});

router.post("/login", async (req, res) => {
  const { username, password, role } = req.body;

  if (!username || !password) {
    return res.status(400).send({ data: "All fields are required" });
  }
  try {
    const user = await Auth.findOne({ username, password, role });
    if (!user) {
      return res.status(400).send({ data: "Invalid credentials" });
    }

    res.status(200).send({ data: "Login successful" });
  } catch (err) {
    console.log(err);
    res.status(500).send({ err: "Data is not fetched" });
    return;
  }
});

router.get("/", async (req, res) => {
  try {
    const users = await Auth.find({});
    res.status(200).send({ data: users });
  } catch (err) {
    console.log(err);
    res.status(500).send({ err: "Data is not fetched" });
  }
});

module.exports = router;
