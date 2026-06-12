// models/Ticket.js
import mongoose from "mongoose";

const ticketSchema = new mongoose.Schema(
  {
    subject: {
      type: String,
      required: true,
      trim: true,
      maxlength: 200,
    },

    category: {
      type: String,
      required: true,
      enum: ['Payment', 'Security', 'Code Issue', 'Other'],
    },

    orderId: {
      type: String,
      default: null,
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },

    status: {
      type: String,
      enum: ['open', 'closed'],
      default: 'open',
    },

    priority: {
      type: String,
      enum: ['low', 'medium', 'high'],
      default: 'medium',
    },

    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
     chats: [
          {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Chat",
            required: true,
          },
        ],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('Ticket', ticketSchema);