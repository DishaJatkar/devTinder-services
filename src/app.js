const express = require("express");
const connectDB = require("./config/database");
const app = express();
const User = require("./models/user");

app.use(express.json()); // Middleware to parse JSON bodies

app.post("/signup", async (req, res) => {
  try {
    // Create a new instance of the User model
    const user = new User(req.body);
    // Save the user to the database. This returns a Promise
    await user.save();
    res.send("User added successfully");
  } catch (err) {
    res.status(400).send("Error adding user: " + err.message);
  }
});

// Get user by emailId
app.get("/user", async (req, res) => {
  try {
    const users = await User.findOne({ emailId: req.body.emailId });
    if (!users) {
      return res.status(404).send("User not found");
    } else {
      res.send(users);
    }
  } catch (err) {
    res.status(400).send("Error fetching user: " + err.message);
  }
});

// Feed API - GET /feed - get all users from the database
app.get("/feed", async (req, res) => {
  try {
    const users = await User.find({});
    if (users.length === 0) {
      return res.status(404).send("No users found");
    } else {
      res.send(users);
    }
  } catch (err) {
    res.status(400).send("Error fetching feed: " + err.message);
  }
});

// Delete user by userId
app.delete("/user", async (req, res) => {
  const userId = req.body.userId;
  try {
    const user = await User.findByIdAndDelete(userId);
    res.send("User deleted successfully");
  } catch (err) {
    res.status(400).send("Error deleting user: " + err.message);
  }
});

// Update data of user
app.patch("/user", async (req, res) => {
  const data = req.body;
  const userId = data.userId;
  try {
    const user = await User.findByIdAndUpdate(userId, data,{
      runValidators: true, // Ensure that validation rules are applied during update
    });
    res.send("User updated successfully");
  } catch (err) {
    res.status(400).send("Error updating user: " + err.message);
  }
});

// Update user with emailId
// app.patch("/user", async (req, res) => {
//   const data = req.body;
//   const emailId = data.emailId;
//   console.log("EmailId to update:", emailId);
//   delete data.emailId; // Remove emailId from data to avoid updating it
//   console.log("Data to update:", data);
//   try {
//     const user = await User.findOneAndUpdate({ emailId: emailId }, data);
//     res.send("User updated successfully");
//   } catch {
//     res.status(400).send("Error updating user: " + err.message);
//   }
// });

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
