import mongoose, { Schema } from "mongoose";

const ImageSchema = new Schema({
  id: { type: Number, required: true, unique: true },
  url: { type: String, required: true },
  imageable_type: { type: String, required: true },
  imageable_id: { type: Number, required: true },
  updated_at: { type: Date, required: true },
  created_at: { type: Date, required: true },
});

export default mongoose.model("Image", ImageSchema);
