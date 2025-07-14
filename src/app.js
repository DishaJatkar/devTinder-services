const express = require("express");
const connectDB = require("./config/database");
const app = express();
const User = require("./models/user");

app.post("/signup", async (req, res) => {
  const userObj = {
    firstName: "Yuvraj",
    lastName: "Singh",
    emailId: "yuvrajt@gmail.com",
    password: "Yuvraj123",
  };

  try {
    // Create a new instance of the User model
    const user = new User(userObj);
    // Save the user to the database. This returns a Promise
    await user.save();
    res.send("User added successfully");
  } catch (err) {
    res.status(400).send("Error adding user: " + err.message);
  }
});

connectDB()
  .then(() => {
    console.log("MongoDB connected successfully");
    // Craeted server and listening on post 3000
    app.listen(3000, () => {
      console.log("Server is running on port 3000");
    });
  })
  .catch((err) => {
    console.error("MongoDB connection failed:", err);
  });
