const express = require("express");
const app = express();

const { adminAuth, userAuth } = require("./middlewares/auth");

app.use("/admin", adminAuth);
app.get("/admin/getUserData", (req, res) => {
  res.send("User data retrieved successfully");
});
app.get("/admin/deleteUserData", (req, res) => {
  res.send("User data deleted successfully");
});

app.get("/user/login", (req, res) => {
  res.send("User logged in successfully");
});
app.get("/user/data", userAuth, (req, res) => {
  res.send("User data access approved");
});

app.listen(7777, () => {
  console.log("Server is successfully listening on port 7777...");
});
