import mongoose, { Schema, ObjectId } from "mongoose";
export default mongoose.model(
  "Notification",
  new Schema({
    recipient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: false,
      default: null
    },
    message: {
      type: String,
      required: true
    },
    date: {
      type: Date,
      default: Date.now
    },
    read: {
      type: Boolean,
      default: false
    },
    store: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Store',
      required: true,
    }
  })
);
