// models/Ticket.js
import mongoose from "mongoose";

const chatSchema = new mongoose.Schema(
  {
    message: {
      type: String,
      required: true,
    },
    sender: {
      type: String,
      required: true,
      enum: ['user', 'admin'],
      default : "user"
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('Chat', chatSchema);