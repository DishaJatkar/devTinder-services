const express = require("express");
const { adminAuth, userAuth } = require("./middlewares/auth");

const app = express();

// handle auth middleware for all request GET, POST
app.use("/admin", adminAuth);

app.get("/user", userAuth, (req, res) => {
  res.send("User data retrieved successfully");
});

app.get("/admin/getAllData", (req, res) => {
  res.send("All data retrieved successfully");
});

app.delete("/admin/deleteUser", (req, res) => {
  res.send("Data deleted successfully");
});

// Craeted server and listening on post 3000
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
