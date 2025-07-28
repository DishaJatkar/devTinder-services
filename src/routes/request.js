const express = require("express");
const requestRouter = express.Router();
const { userAuth } = require("../middlewares/auth");

// Send connection request
requestRouter.post("/sendConnectionRequest", userAuth, (req, res) => {
  const user = req.user;
  console.log("Connection request sent by user:" + user);
  res.send(user.firstName + " sent connection request");
});

module.exports = requestRouter;
