import mongoose, { Schema } from "mongoose";

const ModulessSchema = new Schema({
  id: { type: Number, required: true, unique: true },
  name: { type: String, required: true },
  product_id: { type: String, required: true },
});

export default mongoose.model("Moduless", ModulessSchema);
