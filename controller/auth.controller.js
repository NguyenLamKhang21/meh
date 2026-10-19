const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../models");

module.exports = {
  // Render login page
  showLogin: (req, res) => {
    res.render("auth/login", {
      title: "Login",
      error: null,
      success: null,
    });
  },

  // Handle login form submission (EJS Form)
  login: async (req, res) => {
    try {
      const { email, key } = req.body;

      const user = await db.User.findOne({ email });
      if (!user) {
        return res.render("auth/login", {
          title: "Login",
          error: "User not found",
          success: null,
        });
      }

      const isPasswordValid = await bcryptjs.compare(key, user.key);

      if (!isPasswordValid) {
        return res.render("auth/login", {
          title: "Login",
          error: "Invalid password",
          success: null,
        });
      }

      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });

      // Set token in cookie
      res.cookie("token", token, { httpOnly: true, maxAge: 3600000 }); // 1 hour

      // Redirect to home page after successful login
      res.redirect("/");
    } catch (error) {
      res.render("auth/login", {
        title: "Login",
        error: error.message,
        success: null,
      });
    }
  },

  //Api login
  signin: async (req, res) => {
    try {
      const { name, key } = req.body;

      const user = await db.User.findOne({ name });
      if (!user) {
        return res.status(404).json({
          message: "User not found",
          success: false,
        });
      }

      const isPasswordValid = await bcryptjs.compare(key, user.key);

      if (!isPasswordValid) {
        return res.status(401).json({
          message: "Invalid password",
          success: false,
        });
      }

      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });

      res.status(200).json({
        message: "Login successful",
        token: token,
      });
    } catch (error) {
      res.status(500).json({
        message: error.message,
        success: false,
      });
    }
  },
};
