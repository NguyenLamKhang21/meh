const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define schema
const userSchema = new Schema(
  {
    name: { type: String, required: true },
    key: { type: String, required: true },
  },
  { timestamps: true },
);

const User = mongoose.model("User", userSchema);

module.exports = User;
