const express = require("express");
const userRouter = express.Router();
const { userAuth } = require("../middlewares/auth");
const ConnectionRequest = require("../models/connectionRequest");
const User = require("../models/user");

const ALLOWED_FIELDS = "firstName lastName age gender photoUrl about skills";

userRouter.get("/user/requests", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;
    const requests = await ConnectionRequest.find({
      receiverId: loggedInUser._id,
      status: "interested",
    }).populate("senderId", ALLOWED_FIELDS);
    if (!requests.length) {
      return res.status(404).json({ message: `No pending requests` });
    }
    res.json({ message: `Got the requests successfully`, data: requests });
  } catch (err) {
    res.status(400).json({ message: `ERROR: ${err.message}` });
  }
});

userRouter.get("/user/connections", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;
    const connections = await ConnectionRequest.find({
      $or: [{ senderId: loggedInUser._id }, { receiverId: loggedInUser._id }],
      status: "accepted",
    })
      .populate("senderId", ALLOWED_FIELDS)
      .populate("receiverId", ALLOWED_FIELDS);

    if (!connections.length) {
      return res.status(404).json({ message: `No connections found` });
    }

    const data = connections.map((key) => {
      if (String(key.senderId._id) === loggedInUser._id.toString()) {
        return key.receiverId;
      }
      return key.senderId;
    });
    res.json({
      message: `Got the connections successfully`,
      data,
    });
  } catch (err) {
    res.status(400).send(`ERROR: ${err.message}`);
  }
});

userRouter.get("/user/feed", userAuth, async (req, res) => {
  try {
    let { page, limit } = req.query;
    (page = parseInt(page) || 1), (limit = parseInt(limit) || 10);
    limit = limit > 50 ? 50 : limit;
    const skip = (page - 1) * limit;
    const loggedInUser = req.user;
    const connectionRequests = await ConnectionRequest.find({
      $or: [{ senderId: loggedInUser._id }, { receiverId: loggedInUser._id }],
    }).select("senderId receiverId");

    const hideUsersFromFeed = new Set();
    connectionRequests.map((req) => {
      hideUsersFromFeed.add(req.senderId.toString());
      hideUsersFromFeed.add(req.receiverId.toString());
    });

    const users = await User.find({
      $and: [
        { _id: { $nin: Array.from(hideUsersFromFeed) } },
        { _id: { $ne: loggedInUser._id } },
      ],
    })
      .select(ALLOWED_FIELDS)
      .skip(skip)
      .limit(limit);
    res.send(users);
  } catch (err) {
    res.status(400).send(`ERROR: ${err.message}`);
  }
});

module.exports = userRouter;
