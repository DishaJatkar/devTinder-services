const jwt = require("jsonwebtoken");
const User = require("../models/user");

const userAuth = async (req, res, next) => {
  try {
    const { token } = req.cookies;

    if (!token) {
      throw new Error("Token is invalid");
    }

    const decodedObj = await jwt.verify(token, "DEV@TINDER_SECRET");
    const { _id } = decodedObj;
    const user = await User.findById(_id);

    if (!user) {
      throw new Error("User not found");
    }

    req.user = user; // Attach user to request object
    next();
  } catch (err) {
    res.status(400).send("Authentication failed: " + err.message);
  }
};

module.exports = { userAuth };
