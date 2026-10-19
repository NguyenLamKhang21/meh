const mongoose = require("mongoose");
const User = require("./user.model");
const Food = require("./food.model");
const Nation = require("./nation.model");

const db = {};

// Define schema
db.User = User;
db.Food = Food;
db.Natoin = Nation;

module.exports = db;
