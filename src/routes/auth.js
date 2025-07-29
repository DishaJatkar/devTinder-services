const express = require("express");
const authRouter = express.Router();
const bcrypt = require("bcrypt");
const validator = require("validator");
const User = require("../models/user");
const validateSignupData = require("../utils/validation").validateSignupData;

authRouter.post("/signup", async (req, res) => {
  try {
    // Validate signup data
    validateSignupData(req);

    const { password, firstName, lastName, emailId } = req.body;
    // Encrypt the password
    const passwordHash = await bcrypt.hash(password, 10);

    // Create a new instance of the User model
    const user = new User({
      firstName,
      lastName,
      emailId,
      password: passwordHash, // Use the hashed password
    });
    // Save the user to the database. This returns a Promise
    await user.save();
    res.send("User added successfully");
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
});

authRouter.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;

    if (!validator.isEmail(emailId)) {
      throw new Error("Invalid credentials");
    }

    const user = await User.findOne({ emailId });

    if (!user) {
      throw new Error("Invalid credentials");
    }

    const isPasswordValid = await user.validatePassword(password);

    if (isPasswordValid) {
      // Create JWT token
      const token = await user.getJWT();
      // Add token to cookie or send it in response back to user
      res.cookie("token", token, {
        expires: new Date(Date.now() + 8 * 3600000),
      });

      res.send("Login successful");
    } else {
      throw new Error("Invalid credentials");
    }
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
});

authRouter.post("/logout", async (req, res) => {
  res.cookie("token", null, { expires: new Date(Date.now() - 8 * 3600000) });
  res.send("Logout successful");
});

module.exports = authRouter;
