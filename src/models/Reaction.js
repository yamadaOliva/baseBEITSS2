import mongoose, { Schema } from "mongoose";

const ReactionSchema = new Schema({
  id: { type: Number, required: true, unique: true },
  user_id: { type: Number, required: true },
  review_id: { type: Number, required: true },
  type: { type: String, required: true },
  updated_at: { type: Date, required: true },
  created_at: { type: Date, required: true },
});

export default mongoose.model("Reaction", ReactionSchema);
