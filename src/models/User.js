import mongoose, { Schema, ObjectId } from "mongoose";
import ReviewSchema from "./Review";
export default mongoose.model(
  "User",
  new Schema({
    id: Number,
    username: String,
    password: String,
    email: {
      type: String,
      required: true,
      validate: {
        validator: function (v) {
          return /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(v);
        },
        message: (props) => `${props.value} is not a valid email!`,
      },
    },
    fullname: String,
    registerDate: Date,
    avatar: String,
  })
);
