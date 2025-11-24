const express = require("express");
const app = express();

const { connectDB } = require("./config/database");

const User = require("./models/user");

app.post("/signup", async (req, res) => {
  const user = new User({
    firstName: "Jackie",
    lastName: "Chain",
    age: 23,
    emailId: "Jackie@Chaingmail.com",
  });

  try {
    await user.save();
    res.send("User signed up successfully");
  } catch (err) {
    res.status(400).send("Error saving the user:" + err.message);
  }
});

connectDB()
  .then(() => {
    console.log("Database connection established...");
    app.listen(7777, () => {
      console.log("Server is successfully listening on port 7777...");
    });
  })
  .catch((err) => {
    console.error("Database connection failed!!!");
  });
