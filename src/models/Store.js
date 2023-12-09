import mongoose, { Schema } from "mongoose";

const ModuleDetailSchema = new Schema({
  id: { type: Number },
  name: { type: String },
  description: { type: String },
}, {timestamps: true });
const ModulessSchema = new Schema({
  id: { type: Number },
  name: { type: String },
  product_id: { type: String },
  module_details: [ModuleDetailSchema],
}, {timestamps: true });
const ImageSchema = new Schema({
  id: { type: Number },
  url: { type: String },
}, {timestamps: true });
const ReactionSchema = new Schema({
  id: { type: Number },
  user_id: {type: Schema.Types.ObjectId, ref: 'User'},
  type: { type: String },
}, {timestamps: true});
const ReviewSchema = new Schema({
  id: { type: Number },
  user_id: { type: Schema.Types.ObjectId, ref: 'User' },
  content: { type: String },
  rating: { type: Number },
  reactions: [ReactionSchema],
  images: [ImageSchema],
}, {timestamps: true });
const Product = new Schema({
  id: { type: Number },
  name: { type: String },
  description: { type: String },
  brand: { type: String },
  model: { type: String },
  price: { type: Number },
  sale: { type: Number },
  updated_at: { type: Date },
  created_at: { type: Date },
  images: [ImageSchema],
  moduless: [ModulessSchema],
}, {timestamps: true });
const StoreSchema = new Schema({
  id: { type: Number },
  name: { type: String },
  address: { type: String },
  description: { type: String },
  rating: {type: Number},
  products: [Product],
  images: [ImageSchema],
  reviews: [ReviewSchema],
}, {timestamps: true });

export default mongoose.model("Store", StoreSchema);
