import mongoose, { Schema } from "mongoose";

const ModuleDetailSchema = new Schema({
  id: { type: Number },
  name: { type: String },
  description: { type: String },
  moduleId: { type: Number },
  updated_at: { type: Date },
  created_at: { type: Date },
});
const ModulessSchema = new Schema({
  id: { type: Number },
  name: { type: String },
  product_id: { type: String },
  module_details: [ModuleDetailSchema],
});
const ImageSchema = new Schema({
  id: { type: Number },
  url: { type: String },
  imageable_type: { type: String },
  imageable_id: { type: Number },
  updated_at: { type: Date },
  created_at: { type: Date },
});
const ReactionSchema = new Schema({
  id: { type: Number },
  user_id: { type: Number },
  review_id: { type: Number },
  type: { type: String },
  updated_at: { type: Date },
  created_at: { type: Date },
});
const ReviewSchema = new Schema({
  id: { type: Number },
  user_id: { type: Number },
  store_id: { type: Number },
  content: { type: String },
  rating: { type: Number },
  updated_at: { type: Date },
  created_at: { type: Date },
  reactions: [ReactionSchema],
  images: [ImageSchema],
});
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
});
const setRating = (StoreSchema) => {
  const reviews = StoreSchema?.reviews;
  let rating = 0;
  reviews?.forEach((review) => {
    rating += review?.rating;
  });
  rating /= reviews?.length;
  return rating;
};
const StoreSchema = new Schema({
  id: { type: Number },
  name: { type: String },
  address: { type: String },
  description: { type: String },
  rating: {
    type: Number,
    default: setRating(this),
  },
  updated_at: { type: Date, default: Date.now },
  created_at: { type: Date, default: Date.now },
  products: [Product],
  images: [ImageSchema],
  reviews: [ReviewSchema],
});

export default mongoose.model("Store", StoreSchema);
