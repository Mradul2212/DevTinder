const express = require("express");
const requestRouter = express.Router();
const { userAuth } = require("../middlewares/auth");

requestRouter.post("/sendConnectionRequest", userAuth, async (req, res) => {
  const user = req.user.firstName;
  res.send(`${user} sent a connection request`);
});

module.exports = requestRouter;
