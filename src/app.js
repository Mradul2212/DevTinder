const express = require("express");
const app = express();

app.use("/", (req, res) => {
  res.send("Hello from the home");
});
app.use("/user", (req, res) => {
  res.send("Hello from the user");
});
app.use("/test", (req, res) => {
  res.send("Hello from the test");
});

app.listen(7777, () => {
  console.log("Server is successfully listening on port 7777...");
});
