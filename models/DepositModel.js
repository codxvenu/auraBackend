import mongoose from "mongoose";

const depositSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    amount: {
      type: Number,
      required: true,
      min: 0,
    },
    trxid: {
      type: String,
    },
    type: {
      type: String,
      enum: ["deposit", "spending"],
      default: "spending",
    },
    status: {
      type: String,
      enum: ["pending", "completed", "rejected"],
      default: "pending",
    },
  },
  {
    timestamps: true, // creates createdAt and updatedAt
  }
);

export default mongoose.model("Deposit", depositSchema);