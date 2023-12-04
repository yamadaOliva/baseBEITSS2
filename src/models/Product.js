import mongoose, { Schema } from "mongoose";

const Product = new Schema({
  id: { type: Number, required: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  brand: { type: String, required: true },
  model: { type: String, required: true },
  price: { type: Number, required: true },
  sale: { type: Number, required: true },
  updated_at: { type: Date, required: true },
  created_at: { type: Date, required: true },
});

export default mongoose.model("Product", Product);
