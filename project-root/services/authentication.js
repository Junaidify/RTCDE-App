const express = require("express");
const router = express.Router();
const Auth = require("../schemas/authSchema");
const bcrypt = require("bcrypt");

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.post("/register", async (req, res) => {
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

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);
    await Auth.create({ username, password: hashPassword, name, email, role });
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
    const user = await Auth.findOne({ username, role });
    if (!user) {
      return res.status(400).send({ data: "Invalid credentials" });
    }

    const isMatch = bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(200).send({ data: "Invalid credientals" });

    res.status(200).send({ data: "Login successful" });
  } catch (err) {
    console.log(err);
    res.status(500).send({ err: "Data is not fetched" });
    return;
  }
});

router.get("/register", async (req, res) => {
  try {
    const users = await Auth.find({});
    res.status(200).send({ data: users });
  } catch (err) {
    console.log(err);
    res.status(500).send({ err: "Data is not fetched" });
  }
});

module.exports = router;
