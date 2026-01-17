const mongoose = require("mongoose");

const connectionRequestSchema = new mongoose.Schema(
  {
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    receiverId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    status: {
      type: String,
      enum: {
        values: ["ignored", "interested", "accepted", "rejected"],
        message: `{VALUE} status is invalid`,
      },
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

connectionRequestSchema.index({senderId: 1, receiverId: 1});

connectionRequestSchema.pre("save", function () {
  if (this.senderId.equals(this.receiverId)) {
    throw new Error("Can't send connection request to yourself");
  }
});

module.exports = mongoose.model("ConnectionRequest", connectionRequestSchema);
