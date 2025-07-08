const express = require("express");

const app = express();

// request handler: handle incoming request
app.use("/", (req, res) => {
  res.send("Welcome to the Express server!");
});

app.use("/test", (req, res) => {
  res.send("Hello, World!");
});

app.use("/hello", (req, res) => {
  res.send("Hello, Express!");
});

// Craeted server and listening on post 3000
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
