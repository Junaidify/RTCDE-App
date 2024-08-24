const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost:27017/editor")
  .then(() => console.log("mongoDB is connected"))
  .catch((err) => console.log("MongoDB threw an error: ", err));

  module.exports = mongoose; 