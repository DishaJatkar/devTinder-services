const express = require("express");

const app = express();

// request handler: handle incoming request
app.use("/user", (req, res) => {
  res.send("Hello, User!");
});

// this will handle GET call to /user
app.get("/user", (req, res) => {
  res.send({ firstName: "Disha", lastName: "Jatkar" });
});

app.post("/user", (req, res) => {
  console.log("User data received");
  res.send({ message: "User created successfully!" });
});

app.delete("/user", (req, res) => {
  console.log("User deleted");
  res.send({ message: "User deleted successfully!" });
});

// this will match all the http method API calls to /test
// app.use("/test", (req, res) => {
//   res.send("Hello, World!");
// });

app.use("/hello", (req, res) => {
  res.send("Hello, Express!");
});

// app.use("/", (req, res) => {
//   res.send("Welcome to the Express server!");
// });

// Craeted server and listening on post 3000
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
