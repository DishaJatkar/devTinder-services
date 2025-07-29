const express = require("express");
const profileRouter = express.Router();
const { userAuth } = require("../middlewares/auth");
const { validateEditProfileData } = require("../utils/validation");
const validator = require("validator");
const bcrypt = require("bcrypt");

profileRouter.get("/profile/view", userAuth, async (req, res) => {
  try {
    const user = req.user; // User is attached to request object by userAuth middleware

    res.send(user); // Convert Mongoose document to plain object
  } catch (err) {
    res.status(400).send("Error: " + err.message);
  }
});

profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
  try {
    if (!validateEditProfileData(req)) {
      throw new Error("Invalid fields for edit profile");
    }

    const loggedInUser = req.user; // User is attached to request object by userAuth middleware

    Object.keys(req.body).forEach((key) => (loggedInUser[key] = req.body[key]));
    await loggedInUser.save();
    // res.send(loggedInUser.firstName + ", your profile updated successfully");
    res.json({
      message: `${loggedInUser.firstName}, your profile updated successfully`,
      user: loggedInUser,
    });
  } catch (err) {
    res.status(400).send("Error: " + err.message);
  }
});

profileRouter.patch("/profile/password", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user; // User is attached to request object by userAuth middleware
    const isValidPassword = await bcrypt.compare(
      req.body.oldPassword,
      loggedInUser.password
    );
    const isValidNewPassword = validator.isStrongPassword(req.body.newPassword);
    if (isValidNewPassword && isValidPassword) {
      loggedInUser.password = await bcrypt.hash(req.body.newPassword, 10);
      await loggedInUser.save();
      res.json({
        message: `${loggedInUser.firstName}, your password updated successfully`,
      });
    } else {
      throw new Error("Invalid password or new password is not strong enough");
    }
  } catch (err) {
    res.status(400).send("Error: " + err.message);
  }
});

module.exports = profileRouter;
