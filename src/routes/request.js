const express = require("express");
const requestRouter = express.Router();
const { userAuth } = require("../middlewares/auth");
const ConnectionRequest = require("../models/connectionRequest");
const User = require("../models/user");

requestRouter.post(
  "/request/send/:status/:receiverId",
  userAuth,
  async (req, res) => {
    try {
      const senderId = req.user._id;
      const { receiverId, status } = req.params;

      const ALLOWED_STATUS = ["ignored", "interested"];
      if (!ALLOWED_STATUS.includes(status)) {
        return res.status(400).json({ message: `Invalid status: ${status}` });
      }

      const receiver = await User.findById(receiverId);
      if (!receiver || receiverId === senderId) {
        return res.status(404).json({ message: `User not found` });
      }

      const existingConnectionRequest = await ConnectionRequest.findOne({
        $or: [
          { senderId, receiverId },
          { senderId: receiverId, receiverId: senderId },
        ],
      });
      if (existingConnectionRequest) {
        return res
          .status(400)
          .json({ message: `Connection request already exist` });
      }

      const connectionRequest = new ConnectionRequest({
        senderId,
        receiverId,
        status,
      });
      const data = await connectionRequest.save();
      res.json({
        message: `${req.user.firstName} ${
          status === "interested" ? "is interested in" : "ignored"
        } ${receiver.firstName}`,
        data,
      });
    } catch (error) {
      res.status(400).send(`ERROR: ${error.message}`);
    }
  }
);

requestRouter.post(
  "/request/review/:status/:requestId",
  userAuth,
  async (req, res) => {
    try {
      const loggedInUser = req.user;
      const { status, requestId } = req.params;
      const ALLOWED_STATUS = ["accepted", "rejected"];
      if (!ALLOWED_STATUS.includes(status)) {
        return res.status(400).json({ message: `Status not allowed` });
      }
      const connectionRequest = await ConnectionRequest.findOne({
        _id: requestId,
        receiverId: loggedInUser._id,
        status: "interested",
      });
      if (!connectionRequest) {
        return res
          .status(404)
          .json({ message: `Connection request not found` });
      }
      connectionRequest.status = status;
      const data = await connectionRequest.save();
      res.json({ message: `Request ${status}`, data });
    } catch (err) {
      res.status(400).send(`ERROR: ${err.message}`);
    }
  }
);

module.exports = requestRouter;
