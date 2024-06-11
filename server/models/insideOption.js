import mongoose from "mongoose";

const insideOptionSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    order: {
      type: Number,
      unique: true,
      trim: true,
    },
    tag: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      required: true,
    },
    verified: {
      type: Boolean,
      default: false,
      ref: "User",
    },
    insideoption: {
      type: mongoose.ObjectId,
      ref: "Options",
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("InsideOption", insideOptionSchema);
