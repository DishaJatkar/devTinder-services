const express = require("express");
const connectDB = require("./config/database");
const app = express();
const User = require("./models/user");
const { validateSignupData } = require("./utils/validation");
const bcrypt = require("bcrypt");
const validator = require("validator");

app.use(express.json()); // Middleware to parse JSON bodies

app.post("/signup", async (req, res) => {
  try {
    // Validate signup data
    validateSignupData(req);

    const { password, firstName, lastName, emailId } = req.body;
    // Encrypt the password
    const passwordHash = await bcrypt.hash(password, 10);
    console.log("Password hash:", passwordHash);

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

// Login API - POST /login
app.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;

    if (!validator.isEmail(emailId)) {
      throw new Error("Invalid credentials");
    }

    const user = await User.findOne({ emailId });

    if (!user) {
      throw new Error("Invalid credentials");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (isPasswordValid) {
      res.send("Login successful");
    } else {
      throw new Error("Invalid credentials");
    }
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
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
app.patch("/user/:userId", async (req, res) => {
  const data = req.body;
  const userId = req.params?.userId;
  const ALLOWED_UPDATES = ["age", "photoURL", "about", "gender", "skills"];

  try {
    const isUpdateAllowe = Object.keys(data).every((key) =>
      ALLOWED_UPDATES.includes(key)
    );

    if (!isUpdateAllowe) {
      throw new Error("Invalid updates");
    }

    const user = await User.findByIdAndUpdate(userId, data, {
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
