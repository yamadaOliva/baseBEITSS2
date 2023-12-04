import mongoose, { Schema } from "mongoose";

const ModuleDetailSchema = new Schema({
  id: { type: Number, required: true, unique: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  moduleId: { type: Number, required: true },
  updated_at: { type: Date, required: true },
  created_at: { type: Date, required: true },
});

export default mongoose.model("ModuleDetail", ModuleDetailSchema);