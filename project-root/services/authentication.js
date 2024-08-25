const express = require("express");
const router = express.Router();
const Auth = require("../schemas/authSchema");
const bcrypt = require("bcrypt");

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.post("/register", async (req, res) => {
  const { username, password, name, email, role } = req.body;

  if (!username || !password || !name || !email || !role) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const existingUser = await Auth.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ error: "Account already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    await Auth.create({
      username,
      password: hashedPassword,
      name,
      email,
      role,
    });
    res.status(201).json({ message: "User created successfully" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/login", async (req, res) => {
  const { username, password, role } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const user = await Auth.findOne({ username, role });
    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    res.status(200).json({ message: "Login successful" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/register", async (req, res) => {
  try {
    const users = await Auth.find({});
    res.status(200).json({ data: users });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
