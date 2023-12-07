import mongoose, { Schema } from "mongoose";
import ReactionSchema from "./Reaction";
const ReviewSchema = new Schema({
  id: { type: Number, required: true, unique: true },
  user_id: { type: Number, required: true },
  store_id: { type: Number, required: true },
  content: { type: String, required: true },
  rating: { type: Number, required: true },
  updated_at: { type: Date, required: true },
  created_at: { type: Date, required: true },
  reactions: [ReactionSchema],
});

export default ReviewSchema;
