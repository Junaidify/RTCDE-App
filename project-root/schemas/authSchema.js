const mongoose = require("../modules/connect");

const Role = Object.freeze({
  admin: "admin",
  user: "user",
});

const signUpSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  username: {
    type: String,
    unique: true,
  },
  email: {
    type: String,
    unique: true,
  },
  role: {
    type: String,
    enum : Object.values(Role)
  },
  password: {
    type: String,
  },
});

const Auth = mongoose.model("auths", signUpSchema);
module.exports = Auth;
