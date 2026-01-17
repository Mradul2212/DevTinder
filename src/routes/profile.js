const express = require("express");
const profileRouter = express.Router();
const { userAuth } = require("../middlewares/auth");
const { validateEditProfileData } = require("../utils/validation");

profileRouter.get("/profile/view", userAuth, async (req, res) => {
  try {
    const user = req.user;
    res.send(user);
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
});

profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
  try {
    if (!validateEditProfileData(req)) throw new Error("Invalid edit request");
    const user = req.user;
    Object.keys(req.body).map((key) => (user[key] = req.body[key]));
    await user.save();
    res.json({
      message: `${user.firstName}, your profile updated successfully`,
      data: user,
    });
  } catch (error) {
    res.status(400).send(`ERROR: ${error.message}`);
  }
});

module.exports = profileRouter;
