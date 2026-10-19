const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define schema
const nagionSchema = new Schema(
  {
    nationName: { type: String, required: true, unique: true },
    continent: { type: String, required: true },
  },
  { timestamps: true },
);

const Nation = mongoose.model("Nation", nagionSchema);

module.exports = Nation;
