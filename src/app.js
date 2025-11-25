const express = require("express");
const app = express();

const { connectDB } = require("./config/database");
const User = require("./models/user");

app.use(express.json());

app.post("/signup", async (req, res) => {
  // Creating a new instance of the User model
  const user = new User(req.body);
  try {
    await user.save();
    res.send("User signed up successfully");
  } catch (err) {
    res.status(400).send("Error saving the user:" + err.message);
  }
});

app.get("/user", async (req, res) => {
  const userEmail = req.body?.emailId;
  try {
    const users = await User.find({ emailId: userEmail });
    if (!users.length) res.status(404).send("User not found");
    else res.send(users);
  } catch (error) {
    res.status(400).send("Something went wrong");
  }
});

app.get("/feed", async (req, res) => {
  try {
    const users = await User.find({});
    if (!users.length) res.status(404).send("No user present");
    else res.send(users);
  } catch (error) {
    res.status(400).send("Something went wrong");
  }
});

app.delete("/user", async (req, res) => {
  try {
    const id = req.body?._id;
    const user = await User.findByIdAndDelete(id);
    if (user) {
      res.send("User deleted successfully");
    } else res.status(404).send("No user found to delete");
  } catch (error) {
    res.status(400).send("Something went wrong");
  }
});

app.patch("/user", async (req, res) => {
  const data = req.body,
    id = data?.userId;
  try {
    const user = await User.findByIdAndUpdate(id, data, {
      returnDocument: "after",
      runValidators: true
    });
    console.log(user);
    res.send("User data updated successfully");
  } catch (error) {
    res.status(400).send(`Update failed: ${error.message}`);
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
